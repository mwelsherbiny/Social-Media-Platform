import aws from "aws-sdk";

const s3Client = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

export default async function uploadImage(file) {
  const imageKey = `images/${Date.now()}_${file.originalname}`;

  await s3Client
    .upload({
      Bucket: process.env.S3_BUCKET,
      Key: imageKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();

  return imageKey;
}
