import dbConnect from '../../../utils/dbConnect';
import Projects from '../../../models/Projects';
import { storeMulter, nextConnectonFunction, toBit64, cloudinaryUpload } from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';

dbConnect();

const apiRoute = nextConnectonFunction();

const storeMiddleware = storeMulter(2, 'projects').fields([{ name: 'imageOne', maxCount: 1 }, { name: 'imageTwo', maxCount: 1 }]);

apiRoute.use(storeMiddleware);

apiRoute.post(async (req, res) => {
    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        const type = req.body.type;
        const title = req.body.title;
        const shortDesc = req.body.shortDesc;
        const description = req.body.description;
        const conclusion = req.body.conclusion;
        const socials = req.body.socials.split(',');
        const url = req.body.url;
        const onMain = req.body.onMain;
        const date = req.body.date;
        const postType = req.body.postType;

        if (!req.files.imageOne[0] && !req.files.imageTwo[0]) { throw new Error('Загрузите все файлы!') }

        const imageOne = toBit64(req.files.imageOne[0]);
        const imageOneResult = await cloudinaryUpload(imageOne, 'projects_upload', 'video');
        const imageOneUrl = imageOneResult.secure_url;
        const imageOneId = imageOneResult.public_id;
        const imageTwo = toBit64(req.files.imageTwo[0]);
        const imageTwoResult = await cloudinaryUpload(imageTwo, 'projects_upload', 'image');
        const imageTwoUrl = imageTwoResult.secure_url;
        const imageTwoId = imageTwoResult.public_id;

        const body = {
            type, title, shortDesc,
            description, conclusion,
            socials, imageOneUrl, imageOneId,
            imageTwoUrl, imageTwoId,
            url, onMain, date, postType,
        }

        const projects = await Projects.create(body);

        if (!projects) {
            throw new Error('Что то пошло не так...')
        }

        res.status(200).json({ statusCode: 200, data: projects });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
    }
});


apiRoute.get(async (req, res) => {
    try {
        const projects = await Projects.find({}).sort({ date: -1 });

        if (!projects) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }
        res.status(200).json({ statusCode: 200, data: projects });
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