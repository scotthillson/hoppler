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
    begin
      s3.get_object(bucket: BUCKET, key: file_path)
      return false
    rescue
      s3.put_object(bucket: BUCKET, key: file_path, body: file )
      return true
    end
  end

  def self.test key
    s3 = bucket
    begin
      s3.get_object(bucket: BUCKET, key: key)
      return false
    rescue
      return true
    end
  end

end
