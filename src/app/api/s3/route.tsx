import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Cliente = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESKEY_S3 as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_S3 as string,
  },
});

const bucketS3 = process.env.NEXT_PUBLIC_BUCKET_S3;

export async function POST(req: any) {
  const formData = await req.formData();
  const image = formData.get("image");
  if (image && typeof image === "object" && image.name) {
    const params = {
      Bucket: bucketS3,
      Key: image.name,
      Body: (await image.arrayBuffer()) as Buffer,
      ContentType: image.type,
    };

    const command = new PutObjectCommand(params);
    await s3Cliente.send(command); //Aqui se envia a cargar la imagen a S3
    const getObjectParams = {
      Bucket: bucketS3,
      Key: image.name,
      ACL: "private",
    };

    const getCommand = new GetObjectCommand(getObjectParams);
    //Aqui se recupera la imagen a S3
    const url = await getSignedUrl(s3Cliente, getCommand, {
      expiresIn: 50000,
    });

    return NextResponse.json({
      success: true,
      message: "Succesfull images",
      data: {
        url: url,
      },
    });
  }
  return NextResponse.json({
    success: false,
    message: "Image is required",
    data: null,
  });
}
