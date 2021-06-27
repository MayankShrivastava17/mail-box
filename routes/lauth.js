const express = require('express')
const app = express.Router()
const Luser = require('../modals/myappusers')
const bcrypt = require('bcrypt')
const Mails = require('../modals/mails')

let isLoggedIn = function (req, res, next) {
    if (res.locals.curuser.email)
        return next();
    res.redirect('/login')
}

app.get('/', isLoggedIn, async(req, res) => {
    const mails = await Mails.find({ isSent: false, userid: res.locals.curuser.email})
    res.render('home', {mails: mails})
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    const data = await Luser.findOne({ email: req.body.email })
    bcrypt.compare(req.body.password, data.password).then(function(result) {
        if (!result)
            return res.redirect('/signup');
        req.session.email = req.body.email
        res.redirect('/')
    });
})

app.get('/signup', (req, res) => {
    res.render('register')
})

app.post('/signup', async (req, res) => {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    let datau = {
        email: req.body.email,
        password: hash
    }
    const data = await new Luser(datau);
    await data.save();
    req.session.email = req.body.email
    res.redirect('/')
})

app.get('/logout', (req, res) => {
    req.session.email = null;
    req.logout();
    res.redirect('/')
})

module.exports = app