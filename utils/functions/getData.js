import axios from "axios";

export async function GetSelectorData(type) {
    try {
        const res = await axios.get(`${process.env.URL_BASE}/api/${type}`);
        if (res.data.statusCode === 200) {
            return res.data;
        } else {
            return 'error';
        }
    } catch (error) {
        return 'error';
    }
}