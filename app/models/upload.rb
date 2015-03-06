class Upload < ActiveRecord::Base

  def self.bucket
    aws_key = Rails.application.secrets.aws_key
    aws_secret = Rails.application.secrets.aws_secret
    creds = Aws::Credentials.new(aws_key, aws_secret)
    s3 = Aws::S3::Client.new(credentials: creds, region: 'us-west-2')
    s3
  end

end
