import * as fs from 'fs';
import dbConnect from '../../../utils/dbConnect';
import Projects from '../../../models/Projects';
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

const storeMiddleware = storeMulter(2, 'projects').fields([{ name: 'imageOne', maxCount: 1 }, { name: 'imageTwo', maxCount: 1 }]);

apiRoute.use(storeMiddleware);

apiRoute.put(async (req, res) => {
    const {
        query: { id },
    } = req;

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
        let imageOneUrl = null;
        let imageOneId = null;
        let imageTwoUrl = null;
        let imageTwoId = null;

        if (req.files.imageOne) {
            const projectById = await Projects.findById(id);
            console.log(projectById);
            await cloudinaryDelete(projectById.imageOneId, 'video');

            const imageOne = toBit64(req.files.imageOne[0]);
            const cloudinaryResult = await cloudinaryUpload(imageOne, 'projects_upload', 'video');
            imageOneUrl = cloudinaryResult.secure_url;
            imageOneId = cloudinaryResult.public_id;
        } else {
            const projectById = await Projects.findById(id);
            imageOneUrl = projectById.imageOneUrl;
            imageOneId = projectById.imageOneId;
        }
        if (req.files.imageTwo) {
            const projectById = await Projects.findById(id);
            await cloudinaryDelete(projectById.imageTwoId, 'image');

            const imageTwo = toBit64(req.files.imageTwo[0]);
            const cloudinaryResult = await cloudinaryUpload(imageTwo, 'projects_upload', 'image');
            imageTwoUrl = cloudinaryResult.secure_url;
            imageTwoId = cloudinaryResult.public_id;
        } else {
            const projectById = await Projects.findById(id);
            imageTwoUrl = projectById.imageTwoUrl;
            imageTwoId = projectById.imageTwoId;
        }

        const body = {
            type, title, shortDesc,
            description, conclusion,
            socials, url, onMain, date,
            postType,
            imageOneUrl, imageOneId,
            imageTwoUrl, imageTwoId,
        }

        const project = await Projects.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!project) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: project })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
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

    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        const project = await Projects.findById(id);
        await cloudinaryDelete(project.imageOneId, 'video');
        await cloudinaryDelete(project.imageTwoId, 'image');

        const deleteProject = await Projects.deleteOne({ _id: id });

        if (!deleteProject) {
            throw new Error({ message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: deleteProject });

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