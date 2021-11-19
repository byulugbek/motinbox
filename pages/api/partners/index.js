import dbConnect from '../../../utils/dbConnect';
import Partners from '../../../models/Partners';
import {
    nextConnectonFunction,
    storeMulter,
    cloudinaryUpload,
    toBit64
} from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';
dbConnect();

const apiRoute = nextConnectonFunction();

const storeMiddleware = storeMulter(2).single('imageOne');

apiRoute.use(storeMiddleware);

apiRoute.post(async (req, res) => {
    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        const imageOne = toBit64(req.file);
        const imageOneRes = await cloudinaryUpload(imageOne, 'partners_upload', 'image');

        if (!req.file) { throw new Error('Вы не загрузили фотографию!'); }
        const title = req.body.title;
        const url = req.body.url;
        const queue = req.body.queue;
        const imageOneUrl = imageOneRes.url;
        const imageOneId = imageOneRes.public_id;

        const body = {
            title, url, queue, imageOneUrl, imageOneId,
        }

        const partner = await Partners.create(body);

        if (!partner) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: partner })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
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