import * as fs from 'fs';
import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';
import {
    nextConnectonFunction,
    storeMulter,
    cloudinaryUpload,
    cloudinaryDelete,
    toBit64
} from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';

dbConnect();

const apiRoute = nextConnectonFunction();

const storeMiddleware = storeMulter(2).fields([
    { name: 'imageOne', maxCount: 1 },
    { name: 'imageTwo', maxCount: 1 },
    { name: 'imageThree', maxCount: 1 },
    { name: 'imageFour', maxCount: 1 },
])

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
        let imageThreeUrl = null;
        let imageThreeId = null;
        let imageFourUrl = null;
        let imageFourId = null;

        if (req.files.imageOne) {
            const portfolioById = await Portfolio.findById(id);
            await cloudinaryDelete(portfolioById.imageOneId, 'image');
            const imageOne = toBit64(req.files.imageOne[0]);
            const imageOneRes = await cloudinaryUpload(imageOne, 'portfolios_upload', 'image');
            imageOneUrl = imageOneRes.secure_url;
            imageOneId = imageOneRes.public_id;
        } else {
            const portfolioById = await Portfolio.findById(id);
            imageOneUrl = portfolioById.imageOneUrl;
            imageOneId = portfolioById.imageOneId;
        }
        if (req.files.imageTwo) {
            const portfolioById = await Portfolio.findById(id);
            await cloudinaryDelete(portfolioById.imageTwoId, 'image');
            const imageTwo = toBit64(req.files.imageTwo[0]);
            const imageTwoRes = await cloudinaryUpload(imageTwo, 'portfolios_upload', 'image');
            imageTwoUrl = imageTwoRes.secure_url;
            imageTwoId = imageTwoRes.public_id;
        } else {
            const portfolioById = await Portfolio.findById(id);
            imageTwoUrl = portfolioById.imageTwoUrl;
            imageTwoId = portfolioById.imageTwoId;
        }
        if (req.files.imageThree) {
            const portfolioById = await Portfolio.findById(id);
            await cloudinaryDelete(portfolioById.imageThreeId, 'image');
            const imageThree = toBit64(req.files.imageThree[0]);
            const imageThreeRes = await cloudinaryUpload(imageThree, 'portfolios_upload', 'image');
            imageThreeUrl = imageThreeRes.secure_url;
            imageThreeId = imageThreeRes.public_id;
        } else {
            const portfolioById = await Portfolio.findById(id);
            imageThreeUrl = portfolioById.imageThreeUrl;
            imageThreeId = portfolioById.imageThreeId;
        }
        if (req.files.imageFour) {
            const portfolioById = await Portfolio.findById(id);
            await cloudinaryDelete(portfolioById.imageFourId, 'image');
            const imageFour = toBit64(req.files.imageFour[0]);
            const imageFourRes = await cloudinaryUpload(imageFour, 'portfolios_upload', 'image');
            imageFourUrl = imageFourRes.secure_url;
            imageFourId = imageFourRes.public_id;
        } else {
            const portfolioById = await Portfolio.findById(id);
            imageFourUrl = portfolioById.imageFourUrl;
            imageFourId = portfolioById.imageFourId;
        }

        const body = {
            type, title, shortDesc, description,
            conclusion, socials, url, onMain, date,
            postType, imageOneUrl, imageOneId,
            imageTwoUrl, imageTwoId, imageThreeUrl,
            imageThreeId, imageFourUrl, imageFourId
        }

        const portfolio = await Portfolio.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: portfolio })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
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
    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        const portfolio = await Portfolio.findById(id);
        await cloudinaryDelete(portfolio.imageOneId, 'image');
        await cloudinaryDelete(portfolio.imageTwoId, 'image');
        await cloudinaryDelete(portfolio.imageThreeId, 'image');
        await cloudinaryDelete(portfolio.imageFourId, 'image');
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