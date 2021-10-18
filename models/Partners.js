const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}
const reqNumber = {
    type: Number,
    required: true,
}

const PartnersSchema = new mongoose.Schema({
    title: reqString,
    imageOne: reqString,
    queue: reqNumber,
    url: reqString,
});

module.exports = mongoose.models.Partners || mongoose.model('Partners', PartnersSchema);