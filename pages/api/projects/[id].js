import * as fs from 'fs';
import dbConnect from '../../../utils/dbConnect';
import Projects from '../../../models/Projects';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'projects').fields([{ name: 'cover', maxCount: 1 }, { name: 'image', maxCount: 1 }]);

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
    const cover = req.files.cover ? req.files.cover[0].filename : req.body.cover;
    const image = req.files.image ? req.files.image[0].filename : req.body.image;

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.files.cover && fs.unlinkSync(`./public/uploads/projects/${cover}`);
        req.files.image && fs.unlinkSync(`./public/uploads/projects/${image}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    // get old images array of names
    const projectById = await Projects.findById(id);
    // if new images uploaded
    if (req.files.cover) {
        fs.unlinkSync(`./public/uploads/projects/${projectById.cover}`);
    }
    if (req.files.image) {
        fs.unlinkSync(`./public/uploads/projects/${projectById.image}`);
    }

    const body = {
        type, title,
        description, conclusion,
        socials, cover, image,
        url, onMain, date
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
    fs.unlinkSync(`./public/uploads/projects/${projectById.cover}`);
    fs.unlinkSync(`./public/uploads/projects/${projectById.image}`);


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