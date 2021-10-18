const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const TeamSchema = new mongoose.Schema({
    title: reqString,
    description: reqString,
    url: reqString,
    imageOne: reqString,
    postType: reqString,
})

module.exports = mongoose.models.Team || mongoose.model('Team', TeamSchema);