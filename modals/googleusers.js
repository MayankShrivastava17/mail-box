// 553620328965 - voespi1jk5prt8rrcetjc3i6rlqs9fot.apps.googleusercontent.com
// X69n0AlEwRynsfH58etzDq9V

const mongoose = require('mongoose');
const userSchema= mongoose.Schema({
    googleId: {type: String,},
    name: { type: String },
    email: {
        type: String
    }
})
module.exports = mongoose.model('Guser', userSchema);