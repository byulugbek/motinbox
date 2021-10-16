import axios from "axios";

export async function GetSelectorData(type) {
    try {
        const res = await axios.get(`api/${type}`);
        if (res.data.statusCode === 200) {
            return res.data;
        } else {
            return 'error';
        }
    } catch (error) {
        return 'error';
    }
}