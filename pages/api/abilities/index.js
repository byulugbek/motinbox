import dbConnect from '../../../utils/dbConnect';
import Abilities from '../../../models/Abilities';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const abilities = await Abilities.find({});

                res.status(200).json({ statusCode: 200, data: abilities });
            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        case 'POST':
            try {
                const ability = await Abilities.create(req.body);

                res.status(200).json({ statusCode: 200, data: ability });
            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400 });
            break;
    }
}