import multer, { FileFilterCallback } from 'multer';
import { NextRequest } from 'next/server';
import { Request } from 'express';
import { NextApiRequest } from 'next';


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
        cb(null, "./uploads");
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});



const upload = multer({ storage });

export default upload;
