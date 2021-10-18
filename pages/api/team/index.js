import dbConnect from '../../../utils/dbConnect';
import Team from '../../../models/Team';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import * as fs from 'fs';
import Admins from '../../../models/Admins';
dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'team').single('imageOne');

apiRoute.use(uploadMiddleware)

apiRoute.post(async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const url = req.body.url;
    const postType = req.body.postType;
    const imageOne = req.file.filename;

    const body = {
        title, description, url, imageOne, postType
    }

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.file && fs.unlinkSync(`./public/uploads/team/${req.file.filename}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    try {
        const member = await Team.create(body);

        if (!member) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: member })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

apiRoute.get(async (req, res) => {
    try {
        const members = await Team.find({});

        if (!members) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }
        res.status(200).json({ statusCode: 200, data: members });
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