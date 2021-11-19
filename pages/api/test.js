import {
    nextConnectonFunction,
    storeMulter,
    toBit64,
    cloudinaryUpload,
    cloudinaryDelete,
} from '../../utils/functions/apiHelper';

const apiRoute = nextConnectonFunction();

const storeMiddleware = storeMulter('image', 2, 'image');

apiRoute.use(storeMiddleware);

apiRoute.post(async (req, res) => {
    try {
        if (!req.file) { throw new Error('Image is not presented!'); }
        const image64 = toBit64(req.file);
        const cloudinaryResult = await cloudinaryUpload(image64, 'team_upload');
        return res.status(200).json({ message: cloudinaryResult });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
})

apiRoute.delete(async (req, res) => {
    try {
        const result = await cloudinaryDelete('team/cthz8azdm4odcpgudqcu');
        return res.status(200).json({ message: "deleted" });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
})


export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};