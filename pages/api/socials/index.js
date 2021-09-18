import dbConnect from '../../../utils/dbConnect';
import Socials from '../../../models/Socials';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const socials = await Socials.find({});

                res.status(200).json({ statusCode: 200, data: socials });
            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        case 'POST':
            try {
                const social = await Socials.create(req.body);

                res.status(200).json({ statusCode: 200, data: social });
            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400 });
            break;
    }
}