# Use this file to easily define all of your cron jobs.
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
# Learn more: http://github.com/javan/whenever

set :environment, 'developement'

every 5.minutes do
  runner "Tower.populate"
end
