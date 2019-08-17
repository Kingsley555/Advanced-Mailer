const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;

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
