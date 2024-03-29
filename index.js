const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

app.use('/', authRoutes, billingRoutes, surveyRoutes);

if (process.env.NODE_ENV === 'production') {
  // Let Express serve up production assests like main.js, main.css
  app.use(express.static('client/build'));

  // Also Let Express serve the index.html file
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
