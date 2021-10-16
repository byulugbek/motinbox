import dbConnect from '../../../utils/dbConnect';
import Video from '../../../models/Video';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import * as fs from 'fs';
import Admins from '../../../models/Admins';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'video').single('video');

apiRoute.use(uploadMiddleware);

apiRoute.put(async (req, res) => {
    const {
        query: { id },
    } = req;

    const title = req.body.title;
    const description = req.body.description;
    const video = req.file ? req.file.filename : req.body.video;

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.file && fs.unlinkSync(`./public/uploads/video/${req.file.filename}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    // get old images array of names
    const videoById = await Video.findById(id);
    // if new images uploaded
    if (req.file) {
        fs.unlinkSync(`./public/uploads/video/${videoById.video}`);
    }

    const body = { title, description, video }

    try {
        const video = await Video.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!video) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: video })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})


apiRoute.delete(async (req, res) => {
    const {
        query: { id }
    } = req;

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0)
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

    const videoById = await Video.findById(id);
    fs.unlinkSync(`./public/uploads/video/${videoById.video}`);


    try {
        const deleteVideo = await Video.deleteOne({ _id: id });

        if (!deleteVideo) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: deleteVideo });

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};