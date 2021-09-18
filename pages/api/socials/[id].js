import dbConnect from '../../../utils/dbConnect';
import Socials from '../../../models/Socials';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const social = await Socials.findById(id);

                if (!social) {
                    return res.status(400).json({ statusCode: 400 });
                }

                res.status(200).json({ statusCode: 200, data: social });

            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        case 'PUT':
            try {
                const social = await Socials.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })

                if (!social) {
                    return res.status(400).json({ statusCode: 400 });
                }

                res.status(200).json({ statusCode: 200, data: social });

            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        case 'DELETE':
            try {
                const deleteSocial = await Socials.deleteOne({ _id: id });

                if (!deleteSocial) {
                    return res.status(400).json({ statusCode: 400 });
                }

                res.status(200).json({ statusCode: 200, data: deleteSocial });

            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400 });
            break;
    }
}