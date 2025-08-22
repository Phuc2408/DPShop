const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const CustomStrategy = require('passport-custom').Strategy;
const { OAuth2Client } = require('google-auth-library');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); 

const User = require('../models/Users'); 
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

passport.use('google-token', new CustomStrategy(
    async (req, done) => {
        try {
            const idToken = req.body.id_token;

            if (!idToken) {
                return done(null, false, { message: 'No ID token provided from client' });
            }

            const ticket = await googleClient.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID, 
            });

            const payload = ticket.getPayload();

            const profile = {
                id: payload.sub, 
                displayName: payload.name,
                emails: [{ value: payload.email }],
            };

            return socialLogin('google', profile, done);

        } catch (error) {
            console.error("Error in Google CustomStrategy (verifyIdToken):", error.message);
            return done(error, false);
        }
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
