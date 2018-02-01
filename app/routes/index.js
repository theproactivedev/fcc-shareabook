const jsonwebtoken = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const request = require('request');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
// const configAuth = require("../config/auth.js");
let router = require("express").Router();
let Users = require('../models/Users.js');

module.exports = function(app, passport) {
  var createToken = function(auth) {
    return jwt.sign({
      id: auth.id
    }, 'my-secret',
    {
      expiresIn: 60 * 120
    });
  };

  var generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
  };

  var sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  };

  var authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      }
      return null;
    }
  });

  var getCurrentUser = function(req, res, next) {
    Users.findOne({
      "_id" : req.auth.id
    }, function(err, user) {
      if (err) {
        next(err);
      } else {
        req.user = user;
        next();
      }
    });
  };

  router.route('/auth/twitter/reverse')
  .post(function(req, res) {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "https://eg-fcc-shareabook.herokuapp.com/twitter-callback",
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET
      }
    }, function (err, r, body) {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });

  router.route('/auth/twitter')
    .post(function(req, res, next) {
      request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: process.env.TWITTER_KEY,
          consumer_secret: process.env.TWITTER_SECRET,
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
      }, function (err, r, body) {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);
        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;

        next();
      });
    }, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {
        if (!req.user) {
          return res.status(401).send("User Not Authenticated");
        }
        // prepare token for API
        req.auth = {
          id: req.user.id
        };

        return next();
  }, generateToken, sendToken);

  app.use("/api/v1", router);

  app.route("/userProfile").get(authenticate, getCurrentUser, function(req, res) {
    Users.findOne({
        "_id" : req.auth.id
    }, function(err, data) {
      if (err) { console.log(err); }
      if (data) { res.json(data); }
    });
  }).post(authenticate, getCurrentUser, function(req, res) {
    Users.findOneAndUpdate(
      { "_id" : req.auth.id },
      {$set : {
        "user.name" : req.body.name,
        "user.city" : req.body.city,
        "user.state" : req.body.state,
      } },
      function(err) {
      if (err) { console.log(err); }
    });
  });

  app.route("/search/:title").get(function(req, res) {
    var link = "https://www.googleapis.com/books/v1/volumes?q="+ req.params.title + "&printType=books&key=" + process.env.BOOK_API_KEY;
    fetch(link)
      .then(response => response.json(),
      error => console.log(error))
      .then(json => {
        if (json === undefined) {
          res.json({error: "No books found."});
        } else {
          let books = json.items.map(book => {
            let { title, subtitle, authors, publishedDate, imageLinks, infoLink } = book.volumeInfo;
  		  		let imageUrl = imageLinks && imageLinks.thumbnail.replace(/&zoom=1&edge=curl/, '');
  		  		return {
  		  			title,
  		  			subtitle,
  		  			authors,
  		  			publishedDate,
  		  			googleBookId: book.id,
  		  			imageUrl,
  		  			infoLink
  		  		};
          });
          res.json(books);
        }
      });
  });

  app.route("/addBook").post(authenticate, getCurrentUser, function(req, res) {
    let obj = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      authors: req.body.authors,
      publishedDate: req.body.publishedDate,
      googleBookId: req.body.googleBookId,
      imageUrl: req.body.imageUrl,
      infoLink: req.body.infoLink,
      owner: req.body.owner,
      borrower: ""
    };

    Users.update(
      { "_id": req.auth.id },
      { $push : { "books" : obj } },
      { upsert: true, new: true},
      function(err) {
        if (err) console.log(err);
      }
    );
  });

  app.route("/removeBook").post(authenticate, getCurrentUser,
    function(req, res) {
      Users.findOneAndUpdate(
        {"_id": req.auth.id},
        {$pull : { "books" : { googleBookId : req.body.bookId } } },
        function(err) {
          if (err) console.log(err);
        }
      );
    });

  app.route("/requestBook").post(authenticate, getCurrentUser,
    function(req, res) {
      let obj = {
        title: req.body.title,
        googleBookId: req.body.googleBookId,
        owner: req.body.owner,
        borrower: req.body.borrower,
        accepted: false,
        rejected: false
      };

      Users.update(
        { "_id": req.auth.id },
        { $push : { "bookRequests" : obj } },
        { upsert: true, new: true},
        function(err) {
          if (err) console.log(err);
        }
      );

    Users.update(
      {"user.userId" : req.body.owner},
      { $push : { "requestedBooksFromUsers" : obj} },
      { upsert: true, new: true},
      function(err) {
        if (err) console.log(err);
      }
    );
  });

  app.route("/removeBookRequest").post(authenticate, getCurrentUser,
    function(req, res) {
      Users.findOneAndUpdate(
        {"_id": req.auth.id},
        {$pull : { "bookRequests" : { googleBookId : req.body.bookId } } },
        function(err) {
          if (err) console.log(err);
      });

      Users.findOneAndUpdate(
        {"user.userId" : req.body.owner},
        { $pull : { "requestedBooksFromUsers" : { googleBookId: req.body.bookId } } },
        function(err) {
          if (err) console.log(err);
        }
      );
  });

  app.route("/acceptRequest").post(authenticate, getCurrentUser,
    function(req, res) {

      Users.findOneAndUpdate(
        { "user.userId" : req.body.borrower,
          "bookRequests.googleBookId" : req.body.googleBookId },
        { $set : {
          "bookRequests.$.accepted" : true
        } },
        function(err) {
        if (err) { console.log(err); }
      });

      Users.findOneAndUpdate(
        { "_id" : req.auth.id,
          "requestedBooksFromUsers.googleBookId" : req.body.googleBookId },
        {$set : {
          "requestedBooksFromUsers.$.accepted" : true
        } },
        function(err) {
        if (err) { console.log(err); }
      });
  });

  app.route("/rejectRequest").post(authenticate, getCurrentUser,
    function(req, res) {

      Users.findOneAndUpdate(
        { "user.userId" : req.body.borrower,
          "bookRequests.googleBookId" : req.body.googleBookId },
        { $set : {
          "bookRequests.$.rejected" : true
        } },
        function(err) {
        if (err) { console.log(err); }
      });

      Users.findOneAndUpdate(
        { "_id" : req.auth.id,
          "requestedBooksFromUsers.googleBookId" : req.body.googleBookId },
        {$set : {
          "requestedBooksFromUsers.$.rejected" : true
        } },
        function(err) {
        if (err) { console.log(err); }
      });
  });

  app.route("/addedBooks").get(authenticate, getCurrentUser,
  function(req, res) {
    Users.findOne({
        "_id" : req.auth.id
    }, function(err, data) {
      if (err) { console.log(err); }
      if (data) { res.json(data.books); }
    });
  });

  app.route("/allBooks").get(function(req, res) {
    Users.find({}, function(err, users) {
      var booksMap = [];
      users.forEach(function(user) {
        booksMap = booksMap.concat(user.books);
      });
      res.json(booksMap);
    });
  });

  app.route("/bookRequests").get(authenticate, getCurrentUser,
  function(req, res) {
    Users.findOne({
        "_id" : req.auth.id
    }, function(err, data) {
      if (err) { console.log(err); }
      if (data) { res.json(data.bookRequests); }
    });
  });

  app.route("/userRequests").get(authenticate, getCurrentUser,
  function(req, res) {
    Users.findOne({
        "_id" : req.auth.id
    }, function(err, data) {
      if (err) { console.log(err); }
      if (data) { res.json(data.requestedBooksFromUsers); }
    });
  });
};
