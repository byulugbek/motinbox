import dbConnect from '../../../utils/dbConnect';
import Abilities from '../../../models/Abilities';
import Admins from '../../../models/Admins';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const abilities = await Abilities.find({});

                res.status(200).json({ statusCode: 200, data: abilities });
            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        case 'POST':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const ability = await Abilities.create(req.body);

                res.status(200).json({ statusCode: 200, data: ability });
            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400 });
            break;
    }
}