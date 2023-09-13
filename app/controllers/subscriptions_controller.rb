# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:webhook]
  skip_before_action :authenticate_user!, only: [:webhook]
  layout 'dashboard'
  def subscriptions
    @current_subscription = current_user.active_plan
    if turbo_frame_request?
      render partial: 'subscriptions/subscriptions'
    end
  end

  def subscribe
    line_item = if params[:plan] == 'pro'
      {
        price: 'price_1NoMW7JKu4x9o99so5s5VJYi',
        quantity: 1
      }
    elsif params[:plan] == 'basic'
      {
        price: 'price_1NoMVBJKu4x9o99sIG6FEJVT',
        quantity: 1
      }
    end
    subscription = Subscription.find_or_create_by!(user: current_user) do |s|
      s.plan = params[:plan]
      s.status = 'pending'
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

  def webhook
    endpoint_secret = 'whsec_fa072d8b322d39d6a480fa6e681605b80fa06e99a9a5fd8e7aa9ff7fa842e370'

    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
        event = Stripe::Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    rescue JSON::ParserError => e
        # Invalid payload
        status 400
        return
    rescue Stripe::SignatureVerificationError => e
        # binding.pry
        # Invalid signature
        status 400
        return
    end

    # Handle the event
    case event.type
    when 'checkout.session.completed'
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

    status 200
  end

  def purchase_success
    session = Stripe::Checkout::Session.retrieve(params[:session_id])
    if session.payment_status == 'paid'
      current_user.update(stripe_customer_id: session.customer) if current_user.stripe_customer_id.nil?
      Subscription.find_or_create_by!(user: current_user) do |s|
        s.status = 'active'
      end
    else
    end
    redirect_to billing_path
  end
end
