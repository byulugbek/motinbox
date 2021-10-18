import dbConnect from '../../../utils/dbConnect';
import Projects from '../../../models/Projects';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';
import * as fs from 'fs';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'projects').fields([{ name: 'imageOne', maxCount: 1 }, { name: 'imageTwo', maxCount: 1 }]);

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
    const type = req.body.type;
    const title = req.body.title;
    const description = req.body.description;
    const conclusion = req.body.conclusion;
    const socials = req.body.socials.split(',');
    const url = req.body.url;
    const onMain = req.body.onMain;
    const date = req.body.date;
    const postType = req.body.postType;
    const imageOne = req.files.imageOne[0].filename;
    const imageTwo = req.files.imageTwo[0].filename;

    const body = {
        type, title,
        description, conclusion,
        socials, imageOne, imageTwo,
        url, onMain, date, postType,
    }

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.files.imageOne && fs.unlinkSync(`./public/uploads/projects/${imageOne}`);
        req.files.imageTwo && fs.unlinkSync(`./public/uploads/projects/${imageTwo}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    try {
        const projects = await Projects.create(body);

        if (!projects) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: projects });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
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