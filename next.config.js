module.exports = {
    env: {
        MONGO_URI: 'mongodb+srv://Azamat:ELS3fCj1xVM7hiBr@motionbox.tjf9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        GOOGLE_ANALITICS: 'G-606VR0F2XC',
        YANDEX_METRICA: '86298806',
        URL_BASE: process.env.NODE_ENV === 'production' ? 'https://motionbox.uz' : 'http://localhost:3000',
    }
}