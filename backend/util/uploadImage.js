import s3Client from "./s3Client.js";

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
