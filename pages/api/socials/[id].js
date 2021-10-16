import dbConnect from '../../../utils/dbConnect';
import Socials from '../../../models/Socials';
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
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const social = await Socials.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })

                if (!social) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: social });

            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        case 'DELETE':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0)
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });

                const deleteSocial = await Socials.deleteOne({ _id: id });

                if (!deleteSocial) {
                    return res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }

                res.status(200).json({ statusCode: 200, data: deleteSocial });

            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            break;
    }
}