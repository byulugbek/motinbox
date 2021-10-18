import * as fs from 'fs';
import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
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
    const imageThree = req.files.imageThree ? req.files.imageThree[0].filename : req.body.imageThree;
    const imageFour = req.files.imageFour ? req.files.imageFour[0].filename : req.body.imageFour;

    const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
    if (isAdmin.length <= 0) {
        req.files.imageOne && fs.unlinkSync(`./public/uploads/portfolio/${imageOne}`);
        req.files.imageTwo && fs.unlinkSync(`./public/uploads/portfolio/${imageTwo}`);
        req.files.imageThree && fs.unlinkSync(`./public/uploads/portfolio/${imageThree}`);
        req.files.imageFour && fs.unlinkSync(`./public/uploads/portfolio/${imageFour}`);
        return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
    }

    // get old images array of names
    const portfolioById = await Portfolio.findById(id);
    // if new images uploaded
    req.files.imageOne && fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.imageOne}`);
    req.files.imageTwo && fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.imageTwo}`);
    req.files.imageThree && fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.imageThree}`);
    req.files.imageFour && fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.imageFour}`);

    const body = {
        type, title, description,
        conclusion, socials, url,
        onMain, date, imageOne,
        imageTwo, imageThree, imageFour,
        postType
    }

    try {
        const portfolio = await Portfolio.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: portfolio })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
    }
})


apiRoute.get(async (req, res) => {
    const {
        query: { id },
    } = req;

    try {
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: portfolio });

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

    const portfolioById = await Portfolio.findById(id);
    fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.imageOne}`);
    fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.imageTwo}`);
    fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.imageThree}`);
    fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.imageFour}`);

    try {
        const deletePortfolio = await Portfolio.deleteOne({ _id: id });

        if (!deletePortfolio) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: deletePortfolio });

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