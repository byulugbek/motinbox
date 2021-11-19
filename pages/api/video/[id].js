import dbConnect from '../../../utils/dbConnect';
import Video from '../../../models/Video';
import {
    nextConnectonFunction,
    storeMulter,
    toBit64,
    cloudinaryUpload,
    cloudinaryDelete
} from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';

dbConnect();

const apiRoute = nextConnectonFunction();

const storeMiddleware = storeMulter(2).single('video');

apiRoute.use(storeMiddleware);

apiRoute.put(async (req, res) => {
    const {
        query: { id },
    } = req;

    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        const title = req.body.title;
        const description = req.body.description;
        let videoUrl = null;
        let videoId = null;

        if (req.file) {
            const videoById = await Video.findById(id);
            await cloudinaryDelete(videoById.videoId, 'video');

            const video = toBit64(req.file);
            const videoRes = await cloudinaryUpload(video, 'video_upload', 'video');
            videoUrl = videoRes.url;
            videoId = videoRes.public_id;
        }
        else {
            const videoById = await Video.findById(id);
            videoUrl = videoById.videoUrl;
            videoId = videoById.videoId;
        }

        const body = { title, description, videoUrl, videoId }

        const video = await Video.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!video) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: video })
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
    }
})


apiRoute.delete(async (req, res) => {
    const {
        query: { id }
    } = req;

    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        const videoById = await Video.findById(id);
        await cloudinaryDelete(videoById.videoId, 'video');

        const deleteVideo = await Video.deleteOne({ _id: id });

        if (!deleteVideo) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: deleteVideo });

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
    }
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};