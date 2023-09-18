# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:stripe_webhook]
  skip_before_action :authenticate_user!, only: [:stripe_webhook]
  layout 'dashboard'
  def subscriptions
    @current_subscription = current_user.active_plan
  end

  def subscribe
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
    if current_user.subscription.present?
      subscription = current_user.subscription
      subscription.update(plan: params[:plan], status: 'pending')
    else
      subscription = Subscription.create!(user: current_user, plan: params[:plan], status: 'pending')
    end
    session = Stripe::Checkout::Session.create(
      metadata: {
        sub_id: subscription.id
      },
      customer_email: current_user.email,
      mode: 'subscription',
      line_items: [line_item],
      payment_method_types: ['card'],
      success_url: "#{ENV['STRIPE_SUCCESS_URL']}?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "#{ENV['HOST']}/billing"
    )
    redirect_to session.url, allow_other_host: true, status: 303
  end

  def stripe_webhook
    endpoint_secret = ENV['STRIPE_WEBHOOK_SECRET']

    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    # binding.pry

    begin
        event = Stripe::Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    rescue JSON::ParserError => e
        # Invalid payload
        head :ok
        return
    rescue Stripe::SignatureVerificationError => e
        # binding.pry
        # Invalid signature
        head :no_content, status: :bad_request
        return
    end

    # Handle the event
    case event.type
    when 'checkout.session.completed'
        # binding.pry
        session = event.data.object
        if session.metadata.sub_id.present?
          subscription = Subscription.find(session.metadata.sub_id)
          subscription.update(status: 'active', stripe_subscription_id: session.subscription, stripe_customer_id: session.customer)
        end
    when 'customer.subscription.created'
        stripe_subscription = event.data.object
        subscription = Subscription.find_by(stripe_subscription_id: stripe_subscription.id)
        subscription.update(status: stripe_subscription.status, paid_until: Time.at(stripe_subscription.current_period_end))
    when 'customer.subscription.deleted'
      stripe_subscription = event.data.object
      stripe_subscription = event.data.object
      subscription = Subscription.find_by(stripe_subscription_id: stripe_subscription.id)
      subscription.update(status: stripe_subscription.status, paid_until: Time.at(stripe_subscription.current_period_end))
    when 'customer.subscription.updated'
      stripe_subscription = event.data.object
      stripe_subscription = event.data.object
      subscription = Subscription.find_by(stripe_subscription_id: stripe_subscription.id)
      subscription.update(status: stripe_subscription.status, paid_until: Time.at(stripe_subscription.current_period_end))
    else
        puts "Unhandled event type: #{event.type}"
    end

    head :ok
  end

  def purchase_success
    session = Stripe::Checkout::Session.retrieve(params[:session_id])
    if session.payment_status == 'paid'
      current_user.update(stripe_customer_id: session.customer) if current_user.stripe_customer_id.nil?
      Subscription.find_or_create_by!(user: current_user) do |s|
        s.status = 'active'
      end
      @current_subscription = current_user.active_plan
      render 'subscriptions/subscription_succeeded'
    else
      render 'subscriptions/subscription_failed'
    end
  end
end
