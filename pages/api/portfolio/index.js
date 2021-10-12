import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'portfolio').array('images');

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
    const type = req.body.type;
    const title = req.body.title;
    const description = req.body.description;
    const conclusion = req.body.conclusion;
    const socials = req.body.socials.split(',');
    const images = req.files.map(e => e.filename);
    const body = {
        type,
        title,
        description,
        conclusion,
        socials,
        images
    }
    try {
        const portfolio = await Portfolio.create(body);

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: portfolio });
    }
    catch (error) {
        res.status(400).json({ statusCode: 400 });
    }
});


apiRoute.get(async (req, res) => {
    try {
        const portfolio = await Portfolio.find({});

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400 });
        }
        res.status(200).json({ statusCode: 200, data: portfolio });
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