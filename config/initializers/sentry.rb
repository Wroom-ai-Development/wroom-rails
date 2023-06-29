Sentry.init do |config|
  config.dsn = 'https://2deafd2e380f4c958f76764dc0d983d4@o4505442148548608.ingest.sentry.io/4505442148614144'
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]

  # To activate performance monitoring, set one of these options.
  # We recommend adjusting the value in production:
  config.traces_sample_rate = 1.0
  # or
  config.traces_sampler = lambda do |context|
    true
  end
end