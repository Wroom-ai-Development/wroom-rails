# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'info@wroom.ai'
  layout 'mailer'
end
