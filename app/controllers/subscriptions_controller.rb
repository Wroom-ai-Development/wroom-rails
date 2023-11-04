# frozen_string_literal: true

class SubscriptionsController < ApplicationController # rubocop:disable Metrics/ClassLength
  skip_before_action :verify_authenticity_token, only: [:stripe_webhook]
  skip_before_action :authenticate_user!, only: [:stripe_webhook]
  layout 'dashboard'
  def subscriptions
    @current_subscription = current_user.subscription
  end

  def subscribe # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    line_item = if params[:plan] == 'pro'
                  {
                    price: ENV['STRIPE_PRO_PRICE_ID'],
                    quantity: 1
                  }
                elsif params[:plan] == 'basic'
                  {
                    price: ENV['STRIPE_BASIC_PRICE_ID'],
                    quantity: 1
                  }
                end

    if current_user.subscription.stripe_subscription_id.present?
      stripe_subscription = Stripe::Subscription.retrieve(current_user.subscription.stripe_subscription_id)
      unless stripe_subscription.status == 'canceled'
        Stripe::Subscription.update(
          current_user.subscription.stripe_subscription_id,
          cancel_at_period_end: false,
          items: [line_item]
        )
      end
    end

    session = Stripe::Checkout::Session.create(
      metadata: {
        sub_id: current_user.subscription.id
      },
      customer_email: current_user.email,
      mode: 'subscription',
      line_items: [line_item],
      payment_method_types: ['card'],
      success_url: "#{ENV['STRIPE_SUCCESS_URL']}?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "#{ENV['HOST']}/billing"
    )

    redirect_to session.url, allow_other_host: true, status: :see_other
  end

  def upgrade_subscription
    sub_id = current_user.subscription.stripe_subscription_id
    subscription = Stripe::Subscription.retrieve(sub_id)

    Stripe::Subscription.update(
      sub_id,
      cancel_at_period_end: false,
      items: [
        { id: subscription.items.data[0].id, price: ENV['STRIPE_PRO_PRICE_ID'] }
      ]
    )

    # binding.pry
    render 'subscriptions/subscription_upgraded'
  end

  def stripe_webhook # rubocop:disable Metrics/AbcSize, Metrics/MethodLength, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
    endpoint_secret = ENV['STRIPE_WEBHOOK_SECRET']

    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, endpoint_secret
      )
    rescue JSON::ParserError
      # Invalid payload
      head :ok
      return
    rescue Stripe::SignatureVerificationError
      # Invalid signature
      head :no_content, status: :bad_request
      return
    end

    # Handle the event
    case event.type
    when 'customer.subscription.created'
      stripe_subscription = event.data.object
      user_email = Stripe::Customer.retrieve(stripe_subscription.customer).email
      plan = Stripe::Product.retrieve(stripe_subscription.plan.product)

      subscription = User.find_by(email: user_email).subscription
      subscription.update(
        paid_until: Time.zone.at(stripe_subscription.current_period_end),
        stripe_subscription_id: stripe_subscription.id,
        plan: plan.name.gsub('wroom ', '').downcase,
        cancelled: false
      )
    when 'invoice.paid'
      invoice = event.data.object
      user_email = Stripe::Customer.retrieve(invoice.customer).email
      user = User.find_by(email: user_email)
      subscription = user.subscription
      user.usage_records.kept.each(&:discard)
      subscription.update(
        paid_until: Time.zone.at(invoice.lines.data[0].period.end),
        cancelled: false,
        paid: true
      )
    when 'invoice.payment_failed'
      invoice = event.data.object
      user_email = Stripe::Customer.retrieve(invoice.customer).email
      subscription = User.find_by(email: user_email).subscription
      subscription.update(paid: false)

    when 'customer.created'
      customer = event.data.object
      user = User.find_by(email: customer.email)
      user.subscription.update(stripe_customer_id: customer.id) if user.present?
    when 'customer.subscription.updated'
      stripe_subscription = event.data.object
      user_email = Stripe::Customer.retrieve(stripe_subscription.customer).email
      subscription = User.find_by(email: user_email).subscription
      plan = Stripe::Product.retrieve(stripe_subscription.plan.product).name.gsub('wroom ', '').downcase
      if event.data.object.cancel_at_period_end
        subscription.update(paid_until: Time.zone.at(stripe_subscription.current_period_end), cancelled: true)
      elsif subscription.plan != plan
        subscription.update(plan:)
      end
    else
      Rails.logger.debug "Unhandled event type: #{event.type}"
    end

    head :ok
  end

  def purchase_success
    session = Stripe::Checkout::Session.retrieve(params[:session_id])
    if session.payment_status == 'paid'
      if current_user.subscription.stripe_customer_id.nil?
        current_user.subscription.update(stripe_customer_id: session.customer)
      end
      @current_subscription = current_user.subscription
      render 'subscriptions/subscription_succeeded'
    else
      render 'subscriptions/subscription_failed'
    end
  end
end
