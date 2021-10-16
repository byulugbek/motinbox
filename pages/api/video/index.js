import dbConnect from '../../../utils/dbConnect';
import Video from '../../../models/Video';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';
import * as fs from 'fs';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'video').single('video');

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const video = req.file.filename;

    const body = { title, description, video };

    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) {
            req.file && fs.unlinkSync(`./public/uploads/video/${req.file.filename}`);
            return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
        }

        const allVideos = await Video.find({});
        if (allVideos.length > 0) {
            req.file && fs.unlinkSync(`./public/uploads/video/${req.file.filename}`);
            return res.status(400).json({ statusCode: 400, data: 'Только один видео блок может существовать' });
        }

        const createVideo = await Video.create(body);

        if (!createVideo) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: createVideo });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

apiRoute.get(async (req, res) => {
    try {
        const video = await Video.find({});

        if (!video) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }
        res.status(200).json({ statusCode: 200, data: video });
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