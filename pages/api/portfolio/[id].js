import * as fs from 'fs';
import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';
import { muterUpload, nextConnectonFunction } from '../../../utils/functions/apiHelper';

dbConnect();

const apiRoute = nextConnectonFunction();

const uploadMiddleware = muterUpload(2, 'portfolio').array('images');

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
    const images = req.files.map(e => e.filename);

    // get old images array of names
    const portfolioById = await Portfolio.findById(id);
    // if new images uploaded
    if (images.length > 0) {
        // delete old images
        for (let i = 0; i < portfolioById.images.length; i++) {
            fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.images[i]}`);
        }
    }

    const body = {
        type,
        title,
        description,
        conclusion,
        socials,
        images: images.length > 0 ? images : portfolioById.images,
    }
    try {
        const portfolio = await Portfolio.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: portfolio })

    } catch (error) {
        res.status(400).json({ statusCode: 400 });
    }
})


apiRoute.get(async (req, res) => {
    const {
        query: { id },
    } = req;

    try {
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: portfolio });

    } catch (error) {
        res.status(400).json({ statusCode: 400 });
    }
})

apiRoute.delete(async (req, res) => {
    const {
        query: { id }
    } = req;

    const portfolioById = await Portfolio.findById(id);
    for (let i = 0; i < portfolioById.images.length; i++) {
        fs.unlinkSync(`./public/uploads/portfolio/${portfolioById.images[i]}`);
    }

    try {
        const deletePortfolio = await Portfolio.deleteOne({ _id: id });

        if (!deletePortfolio) {
            return res.status(400).json({ statusCode: 400 });
        }

        res.status(200).json({ statusCode: 200, data: deletePortfolio });

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