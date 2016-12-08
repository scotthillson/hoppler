# Use this file to easily define cron jobs

set :environment, 'production'

set :output, '/home/rails/weather/log/whenever.log'

every 10.minutes do
  runner "Tower.populate"
end
