import dbConnect from '../../../utils/dbConnect';
import Headings from '../../../models/Headings';
import Admins from '../../../models/Admins';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const heading = await Headings.findById(id);

                if (!heading) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: heading });

            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        case 'PUT':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const heading = await Headings.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })

                if (!heading) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: heading });

            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        case 'DELETE':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const deleteHeading = await Headings.deleteOne({ _id: id });

                if (!deleteHeading) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: deleteHeading });

            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            break;
    }
}