const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const AdminsSchema = new mongoose.Schema({
    token: reqString
});

module.exports = mongoose.models.Admins || mongoose.model('Admins', AdminsSchema);