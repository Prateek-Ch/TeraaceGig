const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


module.exports = function(passport){
  passport.use('local.signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
  }, (req, username, password, done) => {
        User.findOne({'username': username}, (err, user) => {
         if(err){
             return done(err);
         }

          if(user){
              return done(null, false, req.flash('error', 'Username is already taken.'));
          }

          const newUser = new User();
          newUser.username = req.body.username;
          newUser.password = newUser.encryptPassword(req.body.password);
        
          newUser.save((err) => {
                if(err){
                  return done(err);
                }
              done(null, newUser);
          });
      });
      }));


      //SignIn
      passport.use('local.signin', new LocalStrategy({
          usernameField: 'username',
          passwordField: 'password',
          passReqToCallback: true
      }, (req, username, password, done) => {
            User.findOne({'username': username}, (err, user) => {
             if(err){
                 return done(err);
             }

              if(!user){
                  return done(null, false, req.flash('error', 'Invalid Username'));
              }
              if(!user.validPassword(password)){
                          return done(null, false, req.flash('error', 'Invalid Password'));
                      }
              return done(null, user);
              });
          }));


}
