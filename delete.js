import nextConnect from 'next-connect';
import multer from 'multer';
import ProductModel from "../../models/Product";

const oneMegabyteInBytes = 1000000;

const upload = multer({
    limits: { fileSize: oneMegabyteInBytes * 2 },
    storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: 'Sorry something Happened! ${error.message}' });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
});

const uploadMiddleware = upload.array('image');

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
    const { name, price, description } = req.body;
    const images = req.files.map(e => e.filename);

    const product = new ProductModel(name, price, images, description)
    product.createProduct().then(res => {
        if (res === true) {
            res.status(200).json({ message: "Success" });
        } else {
            res.status(500).json({ message: "Maxsulot nomlari bir xil bo'lishi mumkinmas!" });
        }
    });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};