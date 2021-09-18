import dbConnect from '../../../utils/dbConnect';
import Abilities from '../../../models/Abilities';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const ability = await Abilities.findById(id);

                if (!ability) {
                    return res.status(400).json({ statusCode: 400 });
                }

                res.status(200).json({ statusCode: 200, data: ability });

            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        case 'PUT':
            try {
                const ability = await Abilities.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })

                if (!ability) {
                    return res.status(400).json({ statusCode: 400 });
                }

                res.status(200).json({ statusCode: 200, data: ability });

            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        case 'DELETE':
            try {
                const deleteAbility = await Abilities.deleteOne({ _id: id });

                if (!deleteAbility) {
                    return res.status(400).json({ statusCode: 400 });
                }

                res.status(200).json({ statusCode: 200, data: deleteAbility });

            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400 });
            break;
    }
}