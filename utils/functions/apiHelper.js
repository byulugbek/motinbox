import multer from "multer";
import nextConnect from 'next-connect';

export function muterUpload(fileSize, destionation) {
    const oneMegabyteInBytes = 1000000;

    const upload = multer({
        limits: { fileSize: oneMegabyteInBytes * fileSize },
        storage: multer.diskStorage({
            destination: `./public/uploads/${destionation}`,
            filename: (req, file, cb) => cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname),
        }),
    });

    return upload;
}

export function nextConnectonFunction() {
    const apiRoute = nextConnect({
        onError(error, req, res) {
            console.log(error);
            res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
        },
    });
    return apiRoute;
}