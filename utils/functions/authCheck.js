
export function AuthCheck() {
    const token = window.localStorage.getItem('token');

    if (!token) {
        return 'error';
    } else {
        return token;
    }
}
