import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';
import {
    nextConnectonFunction,
    storeMulter,
    cloudinaryUpload,
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

apiRoute.post(async (req, res) => {
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
        if (req.files.length < 4) { throw new Error('Вы не загрузили все фотографии!'); }

        const imageOne = toBit64(req.files.imageOne[0]);
        const imageOneRes = await cloudinaryUpload(imageOne, 'portfolios_upload', 'image');
        const imageOneUrl = imageOneRes.secure_url;
        const imageOneId = imageOneRes.public_id;

        const imageTwo = toBit64(req.files.imageTwo[0]);
        const imageTwoRes = await cloudinaryUpload(imageTwo, 'portfolios_upload', 'image');
        const imageTwoUrl = imageTwoRes.secure_url;
        const imageTwoId = imageTwoRes.public_id;

        const imageThree = toBit64(req.files.imageThree[0]);
        const imageThreeRes = await cloudinaryUpload(imageThree, 'portfolios_upload', 'image');
        const imageThreeUrl = imageThreeRes.secure_url;
        const imageThreeId = imageThreeRes.public_id;

        const imageFour = toBit64(req.files.imageFour[0]);
        const imageFourRes = await cloudinaryUpload(imageFour, 'portfolios_upload', 'image');
        const imageFourUrl = imageFourRes.secure_url;
        const imageFourId = imageFourRes.public_id;

        const body = {
            type, title, shortDesc, description,
            conclusion, socials, url, onMain, date,
            postType, imageOneUrl, imageOneId,
            imageTwoUrl, imageTwoId, imageThreeUrl,
            imageThreeId, imageFourUrl, imageFourId
        }
        const portfolio = await Portfolio.create(body);

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: portfolio });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
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
        res.status(400).json({ statusCode: 400, message: error.message });
    }
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};