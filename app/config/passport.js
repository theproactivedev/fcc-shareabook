'use strict';

var TwitterTokenStrategy = require('passport-twitter-token'),
  Users = require('../models/Users.js');
// var configAuth = require('./auth.js');
//   console.log(configAuth.twitterAuth.consumerKey);

module.exports = function (passport) {

  passport.use(new TwitterTokenStrategy({
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET
    },
    function (token, tokenSecret, profile, done) {
      Users.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }));

};
