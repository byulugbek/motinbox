const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const PortfolioSchema = new mongoose.Schema({
    type: reqString,
    title: reqString,
    shortDesc: reqString,
    description: reqString,
    imageOneUrl: reqString,
    imageOneId: reqString,
    imageTwoUrl: reqString,
    imageTwoId: reqString,
    imageThreeUrl: reqString,
    imageThreeId: reqString,
    imageFourUrl: reqString,
    imageFourId: reqString,
    url: reqString,
    conclusion: reqString,
    socials: [String],
    postType: reqString,
    onMain: { type: Boolean, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);