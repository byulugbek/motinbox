const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const VideoSchema = new mongoose.Schema({
    title: reqString,
    description: reqString,
    videoUrl: reqString,
    videoId: reqString
})

module.exports = mongoose.models.Video || mongoose.model('Video', VideoSchema);