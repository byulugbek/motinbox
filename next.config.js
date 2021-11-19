module.exports = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    env: {
        MONGO_URI: 'mongodb+srv://Azamat:ELS3fCj1xVM7hiBr@motionbox.tjf9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        GOOGLE_ANALITICS: 'G-606VR0F2XC',
        YANDEX_METRICA: '86298806',
        URL_BASE: process.env.NODE_ENV === 'production' ? 'https://motionbox.uz' : 'http://localhost:3000',
        CLOUDINARY_API_NAME: 'motionbox',
        CLOUDINARY_API_KEY: '617813729415431',
        CLOUDINARY_API_SECRET: 'ZD95DzigXV2Z3Z7qO_qZDRuM0FY',
    }
}