import dbConnect from '../../../utils/dbConnect';
import Projects from '../../../models/Projects';
import Portfolio from '../../../models/Portfolio';

dbConnect();

const projFields = {
    _id: 1,
    title: 1,
    description: 1,
    type: 1,
    cover: 1,
    date: 1,
}
const portFields = {
    _id: 1,
    title: 1,
    description: 1,
    type: 1,
    imageOne: 1,
    date: 1,
}

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const projects = await Projects.find(
                    { onMain: true, }, projFields).sort({ date: -1 });
                const portfolio = await Portfolio.find({ onMain: true }, portFields).sort({ date: -1 });

                res.status(200).json({ statusCode: 200, data: { projects, portfolio } });
            } catch (error) {
                res.status(400).json({ statusCode: 400 });
            }
            break;

        default:
            res.status(400).json({ statusCode: 400 });
            break;
    }
}