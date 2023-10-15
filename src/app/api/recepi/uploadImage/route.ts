import { NextRequest, NextResponse } from "next/server";
import AWS from 'aws-sdk';
AWS.config.update({
    accessKeyId: process.env.AWSKEY,
    secretAccessKey: process.env.AWSPASSWORD,
    region: 'us-west-2'
});

const s3 = new AWS.S3();

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.formData();
    const imageName: string = body.get('imageName') as string;
    const file: File | null = body.get('image') as unknown as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const params = {
        Bucket: 'mydbms',
        Key: `nextjs-${Date.now()}-${imageName}`,
        Body: buffer,
    }; 
    let res2 = await s3.upload(params).promise(); 
    return new NextResponse(JSON.stringify({ success: true, path: res2.Location }));
}