/* eslint linebreak-style: ["error", "windows"] */


require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { connectToDb } = require('./db');
const { installHandler } = require('./api_handler');
const auth = require('./auth');

const app = express();

app.use(cookieParser());
app.use('/auth', auth.routes);

installHandler(app);
const port = process.env.PORT || 3000;// process.env.API_SERVER_PORT || 3000;

// eslint-disable-next-line func-names
(async function () {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
