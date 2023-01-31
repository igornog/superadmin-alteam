import { S3 } from 'aws-sdk'
import { environment } from './environments/environment'

const s3 = new S3()
export async function saveAsset(path: string, file: Buffer): Promise<void> {
  const params = {
    Bucket: environment.S3_BUCKET,
    Key: path,
    Body: file,
    CacheControl: 'max-age=31536000',
  }
  await s3.putObject(params).promise()
}
