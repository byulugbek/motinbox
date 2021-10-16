const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}
const ProjectsSchema = new mongoose.Schema({
    type: reqString,
    title: reqString,
    description: reqString,
    cover: reqString,
    image: reqString,
    url: reqString,
    conclusion: reqString,
    socials: [String],
    onMain: { type: Boolean, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.models.Projects || mongoose.model('Projects', ProjectsSchema);