import dbConnect from '../../../utils/dbConnect';
import Projects from '../../../models/Projects';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';
import * as fs from 'fs';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'projects').fields([{ name: 'cover', maxCount: 1 }, { name: 'image', maxCount: 1 }]);

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
    const cover = req.files.cover[0].filename;
    const image = req.files.image[0].filename;

    const body = {
        type, title,
        description, conclusion,
        socials, cover, image,
        url, onMain, date,
    }

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.files.cover && fs.unlinkSync(`./public/uploads/projects/${cover}`);
        req.files.image && fs.unlinkSync(`./public/uploads/projects/${image}`);
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
        const projects = await Projects.find({});

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