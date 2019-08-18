const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

//module.exports = router;

//facebook authentication
// router.get(
//   '/auth/facebook',
//   passport.authenticate('facebook', {
//     scope: ['email', 'public_profile']
//   })
// );

//facbook
// router.get('/auth/facebook/callback', passport.authenticate('facebook'));

//facbook
// router.get('/apis/logout', (req, res) => {
//   req.logout();
//   res.send(req.user);
// });

//facebook
// router.get('/api/curnt_user', (req, res) => {
//   res.send(req.user);
// });
// module.exports = router;
