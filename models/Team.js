const mongoose = require('mongoose');

const srtingReq = {
    type: String,
    required: true
}

const TeamSchema = new mongoose.Schema({
    name: srtingReq,
    position: srtingReq,
    social: srtingReq,
    image: srtingReq,
})

module.exports = mongoose.models.Team || mongoose.model('Team', TeamSchema);