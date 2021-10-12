import dbConnect from '../../../utils/dbConnect';
import Team from '../../../models/Team';
import * as fs from 'fs';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'team').single('image');

apiRoute.use(uploadMiddleware);

apiRoute.put(async (req, res) => {
    const { query: { id } } = req;
    const name = req.body.name;
    const position = req.body.position;
    const social = req.body.social;
    const image = req.file ? req.file.filename : req.body.imamge;

    const body = {
        name, position, social, image
    }

    if (req.file) {
        const memberById = await Team.findById(id);
        fs.unlinkSync(`./public/uploads/team/${memberById.image}`);
    }

    try {
        const member = await Team.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!member) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: member })

    } catch (error) {
        res.status(400).json({ statusCode: 400 });
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

    const memberById = await Team.findById(id);
    fs.unlinkSync(`./public/uploads/team/${memberById.image}`);

    try {
        const deleteMember = await Team.deleteOne({ _id: id });

        if (!deleteMember) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: deleteMember });

    } catch (error) {
        res.status(400).json({ statusCode: 400 });
    }
})


export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};