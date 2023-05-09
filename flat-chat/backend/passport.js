const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
const userId = require('./models/userId');

passport.use(new GoogleStrategy({
  clientID: "714649930014-i71spspgcq1c5qeacqj2r5mqhtj6tii8.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ email: profile.emails[0].value })
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
