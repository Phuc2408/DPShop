const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-oauth-token');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/Users'); 
require('dotenv').config();

passport.use(new LocalStrategy(
    {    
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    },
    async (req, email, password, done) => {
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.hash_password) {
                return done(null, false, { message: 'User is create with another method.' });
            }
            const isMatch = await bcrypt.compare(password, user.hash_password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }
        catch (error) {
            console.error("Error in LocalStrategy:", error);
            return done(error);
        }
    }
));

const socialLogin = async (provider, profile, done) => { 
    try {
        const providerId = profile.id;
        const email = profile.emails[0].value;
        const fullName = profile.displayName 
        
        let user;

        if (provider === 'google') {
            user = await User.findByGoogleId(providerId);
        } else if (provider === 'facebook') {
            user = await User.findByFacebookId(providerId);
        }
        
        if (user) {
            return done(null, user);
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            user = await User.updateSocialId(existingUser.id, provider, providerId);
            return done(null, user);
        }
        
        const newUser = await User.createUserWithProvider(fullName, email, providerId, providerId);
        return done(null, newUser);
    }
    catch (error) {
        console.error(`Error in ${provider} login:`, error);
        return done(error);
    }
}

passport.use(new GoogleTokenStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_ID
    },
    async (accessToken, refreshToken, profile, done) => {
        socialLogin('google', profile, done);
    }
));

passport.use(new FacebookTokenStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        profileFields: ['id', 'displayName', 'emails'] 
    },
    async (accessToken, refreshToken, profile, done) => { 
        socialLogin('facebook', profile, done);
    }
))
