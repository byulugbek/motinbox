const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const PortfolioSchema = new mongoose.Schema({
    type: reqString,
    title: reqString,
    description: reqString,
    imageOne: reqString,
    imageTwo: reqString,
    imageThree: reqString,
    imageFour: reqString,
    url: reqString,
    conclusion: reqString,
    socials: [String],
    postType: reqString,
    onMain: { type: Boolean, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);