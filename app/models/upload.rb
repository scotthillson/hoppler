class Upload < ActiveRecord::Base
  BUCKET = 'hoppler'

  def self.bucket
    aws_key = Rails.application.secrets.aws_key
    aws_secret = Rails.application.secrets.aws_secret
    creds = Aws::Credentials.new(aws_key, aws_secret)
    Aws::S3::Client.new(credentials: creds, region: 'us-west-2')
  end

  def self.upload_file file, file_path
    s3 = bucket
    object = s3.put_object(bucket: BUCKET, key: file_path, body: file )
  end

end
