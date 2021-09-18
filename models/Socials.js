const mongoose = require('mongoose');

const SocialsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'I don\'t know who you are, but title shouldn\'t be null'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'I don\'t know who you are, but description shouldn\'t be null'],
    },
})

module.exports = mongoose.models.Socials || mongoose.model('Socials', SocialsSchema);