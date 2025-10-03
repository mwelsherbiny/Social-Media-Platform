import s3Client from "./s3Client.js";

export default async function deleteImage(imageUrl) {
  const imageKey = imageUrl.split("amazonaws.com/")[1];

  console.log(imageKey);

  await s3Client
    .deleteObject({
      Bucket: process.env.S3_BUCKET,
      Key: imageKey,
    })
    .promise();

  return imageKey;
}
