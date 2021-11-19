import dbConnect from '../../../utils/dbConnect';
import Partners from '../../../models/Partners';
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
        const title = req.body.title;
        const url = req.body.url;
        const queue = req.body.queue;

        let imageOneUrl = null;
        let imageOneId = null;

        if (req.file) {
            const partner = await Partners.findById(id);
            await cloudinaryDelete(partner.imageOneId);

            const imageOne = toBit64(req.file);
            const cloudinaryResult = await cloudinaryUpload(imageOne, 'partners_upload', 'image');
            imageOneUrl = cloudinaryResult.secure_url;
            imageOneId = cloudinaryResult.public_id;
        } else {
            const memberById = await Partners.findById(id);
            imageOneUrl = memberById.imageOneUrl;
            imageOneId = memberById.imageOneId;
        }

        const body = {
            title, queue, url, imageOneUrl, imageOneId,
        }
        const partner = await Partners.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!partner) {
            return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
        }

        res.status(200).json({ statusCode: 200, data: partner })

    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
    }
})

apiRoute.get(async (req, res) => {
    const { query: { id } } = req;
    try {
        const partner = await Partners.findById(id);

        if (!partner) {
            return res.status(400).json({ statusCode: 400 });
        }
        res.status(200).json({ statusCode: 200, data: partner });
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

        const memberById = await Partners.findById(id);
        await cloudinaryDelete(memberById.imageOneId);

        const deletePartner = await Partners.deleteOne({ _id: id });

        if (!deletePartner) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: deletePartner });

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