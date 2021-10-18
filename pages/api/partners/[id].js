import dbConnect from '../../../utils/dbConnect';
import Partners from '../../../models/Partners';
import * as fs from 'fs';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';
dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'partners').single('imageOne');

apiRoute.use(uploadMiddleware);

apiRoute.put(async (req, res) => {
    const { query: { id } } = req;
    const title = req.body.title;
    const url = req.body.url;
    const queue = req.body.queue;
    const imageOne = req.file ? req.file.filename : req.body.imageOne;

    const body = {
        title, queue, url, imageOne,
    }

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.file && fs.unlinkSync(`./public/uploads/partners/${req.file.filename}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    if (req.file) {
        const partner = await Partners.findById(id);
        fs.unlinkSync(`./public/uploads/partners/${partner.imageOne}`);
    }

    try {
        const partner = await Partners.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!partner) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: partner })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

apiRoute.get(async (req, res) => {
    const { query: { id } } = req;
    try {
        const partner = await Partners.findById(id);

        if (!partner) {
            return res.status(400).json({ statusCode: 400 });
        }
        res.status(200).json({ statusCode: 200, data: partner });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400 });
    }
})

apiRoute.delete(async (req, res) => {
    const {
        query: { id }
    } = req;

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0)
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

    const partner = await Partners.findById(id);
    fs.unlinkSync(`./public/uploads/partners/${partner.imageOne}`);

    try {
        const deletePartner = await Partners.deleteOne({ _id: id });

        if (!deletePartner) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: deletePartner });

    } catch (error) {
        res.status(400).json({ statusCode: 400 });
    }
})


export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};