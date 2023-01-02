import process from "process";

export const environment = {
  production: true,
  S3_BUCKET : process.env.S3_BUCKET,
}
