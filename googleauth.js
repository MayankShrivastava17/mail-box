const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const Guser = require('./modals/googleusers')


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SEC,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        Guser.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new Guser({
					_id: new mongoose.Types.ObjectId(),
                    googleId: profile.id,
                    name: profile.displayName,
                    email:profile._json.email
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    Guser.findById(id).then((user) => {
        done(null, user);
    });
});
