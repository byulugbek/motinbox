import dbConnect from '../../../utils/dbConnect';
import Headings from '../../../models/Headings';
import Admins from '../../../models/Admins';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const headings = await Headings.find({});

                if (!headings) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: headings });
            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        case 'POST':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const heading = await Headings.create(req.body);

                if (!heading) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: heading });
            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            break;
    }
}