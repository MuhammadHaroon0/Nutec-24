const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        // Here you can handle the authenticated user, save it to database, etc.
        done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});