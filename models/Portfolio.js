const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}
const PortfolioSchema = new mongoose.Schema({
    type: reqString,
    title: reqString,
    description: reqString,
    images: [String],
    conclusion: reqString,
    socials: [String],
});

module.exports = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);