import dbConnect from '../../../utils/dbConnect';
import Team from '../../../models/Team';
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

const storeMiddleware = storeMulter(2, 'image').single('imageOne');


apiRoute.use(storeMiddleware);

apiRoute.put(async (req, res) => {
    const { query: { id } } = req;
    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        var imageOneUrl = null;
        var imageOneId = null;
        if (req.file) {
            const memberById = await Team.findById(id);
            await cloudinaryDelete(memberById.imageOneId);

            const imageOne = toBit64(req.file);
            const cloudinaryResult = await cloudinaryUpload(imageOne, 'team_upload', 'image');
            imageOneUrl = cloudinaryResult.secure_url;
            imageOneId = cloudinaryResult.public_id;
        } else {
            const memberById = await Team.findById(id);
            imageOneUrl = memberById.imageOneUrl;
            imageOneId = memberById.imageOneId;
        }

        const title = req.body.title;
        const description = req.body.description;
        const url = req.body.url;
        const postType = req.body.postType;

        const body = {
            title, description, url,
            postType, imageOneUrl, imageOneId
        }
        const member = await Team.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!member) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: member })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
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

    try {
        const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
        if (isAdmin.length <= 0) { throw new Error('Вы не авторизованны'); }

        const memberById = await Team.findById(id);
        await cloudinaryDelete(memberById.imageOneId);

        const deleteMember = await Team.deleteOne({ _id: id });

        if (!deleteMember) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: deleteMember });

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