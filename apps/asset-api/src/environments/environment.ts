import * as process from 'process'

export const environment = {
  production: false,
  S3_BUCKET: process.env.S3_BUCKET,
}
