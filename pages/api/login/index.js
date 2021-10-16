import Admins from '../../../models/Admins';
import jwt from 'jsonwebtoken';

const KEY = 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm';

export default async (req, res) => {
    const { method, body } = req;

    const { username, password } = body;
    console.log(req.headers);

    switch (method) {
        case 'POST':
            try {
                if (username === 'motionbox' && password == '12345') {
                    const token = jwt.sign({ username, admin: true, }, KEY);

                    const uploadToken = await Admins.create({ token: token });

                    return res.status(200).json({ statusCode: 200, data: uploadToken })
                } else {
                    return res.status(200).json({
                        statusCode: 405,
                        data: {
                            message: 'Wrong username or password'
                        }
                    })
                }
            } catch (error) {
                console.log(error);
                res.status(400).json({ statusCode: 400 });
            }
            break;

        case 'GET':
            try {
                const isAdmin = await Admins.find({ 'token': req.headers.authorization }).populate('token');
                if (isAdmin.length <= 0) {
                    return res.status(400).json({ statusCode: 400, message: 'Вы не авторизованны' });
                } else {
                    // console.log(isAdmin);
                    const deleteAdmin = await Admins.deleteOne({ _id: isAdmin[0]._id });
                    console.log(deleteAdmin);
                    res.status(200).json({ statusCode: 200, data: deleteAdmin })
                }
            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400 });
            break;
    }
}