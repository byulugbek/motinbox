import dbConnect from '../../../utils/dbConnect';
import Video from '../../../models/Video';
import {
    nextConnectonFunction,
    storeMulter,
    cloudinaryUpload,
    toBit64
} from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';

dbConnect();

const apiRoute = nextConnectonFunction();

const storeMiddleware = storeMulter(2).single('video');

apiRoute.use(storeMiddleware);

apiRoute.post(async (req, res) => {
    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }
        const allVideos = await Video.find({});
        if (allVideos.length > 0) {
            throw new Error({ message: 'Только одно видео может быть загруженно' });
        }

        if (!req.file) { throw new Error('Видео не загруженно'); }

        const video = toBit64(req.file);
        const videoRes = await cloudinaryUpload(video, 'video_upload', 'video');


        const title = req.body.title;
        const description = req.body.description;
        const videoUrl = videoRes.url;
        const videoId = videoRes.public_id;

        const body = { title, description, videoUrl, videoId };


        const createVideo = await Video.create(body);

        if (!createVideo) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: createVideo });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
    }
})

apiRoute.get(async (req, res) => {
    try {
        const video = await Video.find({});

        if (!video) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }
        res.status(200).json({ statusCode: 200, data: video[0] });
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