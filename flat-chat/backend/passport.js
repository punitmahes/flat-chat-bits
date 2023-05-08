const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
const userId = require('./models/userId');

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ name: profile.displayName })
    .then(user => {
      if (user) {
        done(null,user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });

        newUser.save()
          .then(user => done(null,user))
          .catch(err => done(err));
      }
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    })
    .catch(err => done(err));
});
