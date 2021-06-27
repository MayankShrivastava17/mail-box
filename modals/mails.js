const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    userid: {
        type: String
    },
    to: {
        type: Array
    },
    cc: {
        type: Array
    },
    subject: {
        type: String
    },
    content: {
        type: String
    },
    schedule: {
        type: String
    },
    isSent: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Mail', mailSchema)