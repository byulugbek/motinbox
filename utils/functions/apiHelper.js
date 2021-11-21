import multer from "multer";
import nextConnect from 'next-connect';
import path from 'path';
import DatauriParser from 'datauri/parser';
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export function storeMulter(fileSize) {
    const oneMegabyteInBytes = 1000000;
    const storage = multer.memoryStorage();

    return multer({
        limits: { fileSize: oneMegabyteInBytes * fileSize },
        storage,
    })
}
export function toBit64(file) {
    const parser = new DatauriParser();
    return parser.format(path.extname(file.originalname).toString(), file.buffer);
}

export async function cloudinaryUpload(file, uploadPreset, type) {
    return await cloudinary.uploader.upload(file.content, {
        resource_type: type,
        upload_preset: uploadPreset,
        use_filename: true,
        unique_filename: false
    });
}

export async function cloudinaryDelete(public_id, type) {
    return cloudinary.uploader.destroy(public_id, { resource_type: type });
}

export function nextConnectonFunction() {
    const apiRoute = nextConnect({
        onError(error, req, res) {
            console.log(error);
            res.status(502).json({ message: `Sorry something Happened! ${error.message}` });
        },
        onNoMatch(req, res) {
            res.status(405).json({ message: `Method '${req.method}' Not Allowed` });
        },
    });
    return apiRoute;
}