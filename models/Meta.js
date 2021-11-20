const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const MetaSchema = new mongoose.Schema({
    mainTitle: reqString,
    mainDesc: reqString,
    aboutTitle: reqString,
    aboutDesc: reqString,
    projectsTitle: reqString,
    projectsDesc: reqString,
    portfolioTitle: reqString,
    portfolioDesc: reqString,
    contactTitle: reqString,
    contactDesc: reqString,
})

module.exports = mongoose.models.Meta || mongoose.model('Meta', MetaSchema);