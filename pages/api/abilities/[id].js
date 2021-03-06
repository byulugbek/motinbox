import dbConnect from '../../../utils/dbConnect';
import Abilities from '../../../models/Abilities';
import Admins from '../../../models/Admins';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method,
        headers
    } = req;

    switch (method) {
        case 'GET':
            try {
                const ability = await Abilities.findById(id);

                if (!ability) {
                    res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: ability });

            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        case 'PUT':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const ability = await Abilities.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })

                if (!ability) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: ability });

            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        case 'DELETE':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const deleteAbility = await Abilities.deleteOne({ _id: id });

                if (!deleteAbility) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: deleteAbility });

            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            break;
    }
}