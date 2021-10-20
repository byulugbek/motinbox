module.exports = {
    env: {
        MONGO_URI: 'mongodb+srv://Azamat:ELS3fCj1xVM7hiBr@motionbox.tjf9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        URL_BASE: process.env.NODE_ENV === 'production' ? 'http://localhost:8000' : 'http://localhost:3000',
    }
}