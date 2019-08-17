const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // Search for existing user with a given profile id, if exist will not create it again
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // Create new user
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

// Facebook Strategy

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: keys.facebookClientID,
//       clientSecret: keys.facebookClientSecret,
//       callbackURL: '/auth/facebook/callback'
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Search for existing user with a given profile id, if exist will not create it again
//       User.findOne({ facebookId: profile.id }).then(existingUser => {
//         if (existingUser) {
//           done(null, existingUser);
//         } else {
//           // Create new user
//           new User({ facebookId: profile.id })
//             .save()
//             .then(user => done(null, user));
//         }
//       });
//     }
//   )
// );
