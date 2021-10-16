const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const HeadingsSchema = new mongoose.Schema({
    title: reqString,
    description: reqString,
})

module.exports = mongoose.models.Headings || mongoose.model('Headings', HeadingsSchema);