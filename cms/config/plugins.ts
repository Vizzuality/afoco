export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('ASSETS_BUCKET_USER_ACCESS_KEY'),
        secretAccessKey: env('ASSETS_BUCKET_USER_SECRET_KEY'),
        region: env('ASSETS_BUCKET_REGION'),
        params: {
          ACL: env('AWS_ACL', 'public-read'),
          signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
          Bucket: env('ASSETS_BUCKET_NAME'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
