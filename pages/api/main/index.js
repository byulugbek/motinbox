import dbConnect from '../../../utils/dbConnect';
import Projects from '../../../models/Projects';
import Portfolio from '../../../models/Portfolio';
import Partners from '../../../models/Partners';

dbConnect();

const fields = {
    _id: 1,
    title: 1,
    shortDesc: 1,
    type: 1,
    imageOne: 1,
    date: 1,
    postType: 1,
}

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const projects = await Projects.find({ onMain: true, }, fields).sort({ date: -1 });
                const portfolio = await Portfolio.find({ onMain: true }, fields).sort({ date: -1 });
                const partners = await Partners.find({}).sort({ queue: 1 });

                res.status(200).json({ statusCode: 200, data: { projects, portfolio, partners } });
            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            break;
    }
}