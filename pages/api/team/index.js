import dbConnect from '../../../utils/dbConnect';
import Team from '../../../models/Team';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';
dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'team').single('image');

apiRoute.use(uploadMiddleware)

apiRoute.post(async (req, res) => {
    const name = req.body.name;
    const position = req.body.position;
    const social = req.body.social;
    const image = req.file.filename;

    const body = {
        name, position, social, image
    }

    try {
        const member = await Team.create(body);

        if (!member) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: member })

    } catch (error) {
        res.status(400).json({ statusCode: 400 });
    }
})

apiRoute.get(async (req, res) => {
    try {
        const members = await Team.find({});

        if (!members) {
            return res.status(400).json({ statusCode: 400 });
        }
        res.status(200).json({ statusCode: 200, data: members });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400 });
    }
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};