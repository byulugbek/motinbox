import dbConnect from '../../../utils/dbConnect';
import Partners from '../../../models/Partners';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import * as fs from 'fs';
import Admins from '../../../models/Admins';
dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'partners').single('imageOne');

apiRoute.use(uploadMiddleware)

apiRoute.post(async (req, res) => {
    const title = req.body.title;
    const url = req.body.url;
    const queue = req.body.queue;
    const imageOne = req.file.filename;

    const body = {
        title, url, queue, imageOne
    }

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.file && fs.unlinkSync(`./public/uploads/partners/${req.file.filename}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    try {
        const partner = await Partners.create(body);

        if (!partner) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: partner })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

apiRoute.get(async (req, res) => {
    try {
        const partners = await Partners.find({}).sort({ queue: 1 });

        if (!partners) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }
        res.status(200).json({ statusCode: 200, data: partners });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};