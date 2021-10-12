

export async function GetSelectorData(type) {
    try {
        const res = await fetch(`http://localhost:3000/api/${type}`);
        const data = await res.json();

        return data;
    } catch (e) {
        return 'error';
    }
}