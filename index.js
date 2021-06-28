if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}
const express = require('express')
const app = express()
const passport = require('passport');
const mongoose = require('mongoose');
const GauthRoutes = require("./routes/auth.js");
const Lauthroutes = require('./routes/lauth')
const mailroutes = require('./routes/mail')

require('./googleauth')

mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true , useNewUrlParser: true, useCreateIndex: true})
    .then(()=>{
        console.log("DB Connected");
    })
    .catch(err=>{
        console.log(err);
    })

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(__dirname + "/public"))

const session = require("express-session")({
    secret: "Love Towards Travel",
    resave: false,
    saveUninitialized: false
});


app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
    res.locals.curuser = req.user || req.session;
    next();
})

app.use('/auth', GauthRoutes)
app.use(Lauthroutes)
app.use(mailroutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server Started');
})

