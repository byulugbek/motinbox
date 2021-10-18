import dbConnect from '../../../utils/dbConnect';
import Team from '../../../models/Team';
import * as fs from 'fs';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';
dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'team').single('imageOne');

apiRoute.use(uploadMiddleware);

apiRoute.put(async (req, res) => {
    const { query: { id } } = req;
    const title = req.body.title;
    const description = req.body.description;
    const url = req.body.url;
    const postType = req.body.postType;
    const imageOne = req.file ? req.file.filename : req.body.imageOne;

    const body = {
        title, description, url, imageOne, postType
    }

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.file && fs.unlinkSync(`./public/uploads/team/${req.file.filename}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    if (req.file) {
        const memberById = await Team.findById(id);
        fs.unlinkSync(`./public/uploads/team/${memberById.imageOne}`);
    }

    try {
        const member = await Team.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!member) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: member })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

apiRoute.get(async (req, res) => {
    const { query: { id } } = req;
    try {
        const member = await Team.findById(id);

        if (!member) {
            return res.status(400).json({ statusCode: 400 });
        }
        res.status(200).json({ statusCode: 200, data: member });
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

    const memberById = await Team.findById(id);
    fs.unlinkSync(`./public/uploads/team/${memberById.imageOne}`);

    try {
        const deleteMember = await Team.deleteOne({ _id: id });

        if (!deleteMember) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: deleteMember });

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