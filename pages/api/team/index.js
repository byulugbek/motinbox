import dbConnect from '../../../utils/dbConnect';
import Team from '../../../models/Team';
import {
    nextConnectonFunction,
    storeMulter,
    cloudinaryUpload,
    toBit64
} from '../../../utils/functions/apiHelper';
import Admins from '../../../models/Admins';
dbConnect();

const apiRoute = nextConnectonFunction();

const storeMiddleware = storeMulter(2).single('imageOne');

apiRoute.use(storeMiddleware);

apiRoute.post(async (req, res) => {
    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        if (!req.file) { throw new Error('Вы не загрузили фотографию!'); }
        const imageOne = toBit64(req.file);
        const cloudinaryResult = await cloudinaryUpload(imageOne, 'team_upload', 'image');

        const title = req.body.title;
        const description = req.body.description;
        const url = req.body.url;
        const postType = req.body.postType;
        const imageOneId = cloudinaryResult.public_id;
        const imageOneUrl = cloudinaryResult.url;

        const body = {
            title, description, url, postType,
            imageOneId, imageOneUrl
        }
        const member = await Team.create(body);

        if (!member) {
            throw new Error('Что то пошло не так...');
        }

        res.status(200).json({ statusCode: 200, data: member })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
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