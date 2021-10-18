import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
import * as fs from 'fs';
import Admins from '../../../models/Admins';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'portfolio').fields([
    { name: 'imageOne', maxCount: 1 },
    { name: 'imageTwo', maxCount: 1 },
    { name: 'imageThree', maxCount: 1 },
    { name: 'imageFour', maxCount: 1 },
])

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
    const imageThree = req.files.imageThree[0].filename;
    const imageFour = req.files.imageFour[0].filename;

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.files.imageOne && fs.unlinkSync(`./public/uploads/portfolio/${imageOne}`);
        req.files.imageTwo && fs.unlinkSync(`./public/uploads/portfolio/${imageTwo}`);
        req.files.imageThree && fs.unlinkSync(`./public/uploads/portfolio/${imageThree}`);
        req.files.imageFour && fs.unlinkSync(`./public/uploads/portfolio/${imageFour}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    const body = {
        type, title, description,
        conclusion, socials, url,
        onMain, date, imageOne,
        imageTwo, imageThree, imageFour,
        postType
    }
    try {
        const portfolio = await Portfolio.create(body);

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: portfolio });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
});


apiRoute.get(async (req, res) => {
    try {
        const portfolio = await Portfolio.find({}).sort({ date: -1 });

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }
        res.status(200).json({ statusCode: 200, data: portfolio });
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