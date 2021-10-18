import * as fs from 'fs';
import dbConnect from '../../../utils/dbConnect';
import Projects from '../../../models/Projects';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'projects').fields([{ name: 'imageOne', maxCount: 1 }, { name: 'imageTwo', maxCount: 1 }]);

apiRoute.use(uploadMiddleware);

apiRoute.put(async (req, res) => {
    const {
        query: { id },
    } = req;

    // define all new data
    const type = req.body.type;
    const title = req.body.title;
    const description = req.body.description;
    const conclusion = req.body.conclusion;
    const socials = req.body.socials.split(',');
    const url = req.body.url;
    const onMain = req.body.onMain;
    const date = req.body.date;
    const postType = req.body.postType;
    const imageOne = req.files.imageOne ? req.files.imageOne[0].filename : req.body.imageOne;
    const imageTwo = req.files.imageTwo ? req.files.imageTwo[0].filename : req.body.imageTwo;

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.files.imageOne && fs.unlinkSync(`./public/uploads/projects/${imageOne}`);
        req.files.imageTwo && fs.unlinkSync(`./public/uploads/projects/${imageTwo}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    // get old imageTwos array of names
    const projectById = await Projects.findById(id);
    // if new imageTwos uploaded
    if (req.files.imageOne) {
        fs.unlinkSync(`./public/uploads/projects/${projectById.imageOne}`);
    }
    if (req.files.imageTwo) {
        fs.unlinkSync(`./public/uploads/projects/${projectById.imageTwo}`);
    }

    const body = {
        type, title,
        description, conclusion,
        socials, imageOne, imageTwo,
        url, onMain, date, postType
    }

    try {
        const project = await Projects.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!project) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: project })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

apiRoute.get(async (req, res) => {
    const {
        query: { id },
    } = req;

    try {
        const project = await Projects.findById(id);

        if (!project) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: project });

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})

apiRoute.delete(async (req, res) => {
    const {
        query: { id }
    } = req;

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    const projectById = await Projects.findById(id);
    fs.unlinkSync(`./public/uploads/projects/${projectById.imageOne}`);
    fs.unlinkSync(`./public/uploads/projects/${projectById.imageTwo}`);


    try {
        const deleteProject = await Projects.deleteOne({ _id: id });

        if (!deleteProject) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: deleteProject });

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