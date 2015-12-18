# Use this file to easily define all of your cron jobs

# Learn more: http://github.com/javan/whenever

set :environment, 'development'

every 10.minutes do
  runner "Tower.populate"
end
