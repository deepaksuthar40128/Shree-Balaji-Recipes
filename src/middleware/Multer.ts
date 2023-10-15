import multer, { FileFilterCallback } from 'multer';
import { NextRequest } from 'next/server';
import { Request } from 'express';
import { NextApiRequest } from 'next';

const storage = multer.diskStorage({
    destination: function (req: NextRequest, file: Express.Multer.File, cb: (error: Error | null, destination: string) => any) {
        cb(null, "./uploads");
    },
    filename: function (req: NextRequest, file: Express.Multer.File, cb: (error: Error | null, filename: string) => any) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const fileFilter = (req: NextRequest, file: Express.Multer.File, cb: FileFilterCallback):any => {
    // Modify this function to check the file's mimetype if needed
    // For example, you can check if the file is an image
    // if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    // } else {
    //     cb(new Error("Only image files are allowed!"), false);
    // }
};

const upload = multer({ storage, fileFilter });

export default upload;
