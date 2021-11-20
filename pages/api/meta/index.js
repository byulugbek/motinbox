import dbConnect from '../../../utils/dbConnect';
import Meta from '../../../models/Meta';
import Admins from '../../../models/Admins';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const meta = await Meta.find({});

                res.status(200).json({ statusCode: 200, data: meta });
            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        case 'POST':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const allMeta = await Meta.find({});
                if (allMeta.length > 0) {
                    return res.status(400).json({ statusCode: 400, message: 'Не может быть два мета файла!' });
                }

                const meta = await Meta.create(req.body);

                if (!meta) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: meta });
            } catch (error) {
                res.status(400).json({ statusCode: 400, message: error.message });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            break;
    }
}