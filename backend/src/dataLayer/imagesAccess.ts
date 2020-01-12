import * as AWS  from 'aws-sdk'

const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION || "300", 10);

export class ImagesAccess {
  constructor(
    private readonly imagesBucket = process.env.IMAGES_BUCKET || ""
  ) {}

  getUploadUrl(id: string): string {
    return s3.getSignedUrl('putObject', {
      Bucket: this.imagesBucket,
      Key: id,
      Expires: urlExpiration
    });
  }

  delete(id: string): Promise<any> {
    return s3.deleteObject({
      Bucket: this.imagesBucket,
      Key: id
    }).promise();
  }
}
