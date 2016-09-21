'use strict';

const config = require('./config');
const express = require('express');
const http = require('http');
const path = require('path');
const pkg = require('./package.json');
const request = require('superagent');

const app = express();
const port = process.env.PORT || 2020;

app.get('/token', (req, res) => {
  request
    .post('https://api.getmondo.co.uk/oauth2/token')
    .type('form')
    .send({
      grant_type: 'authorization_code',
      client_id: config.client.id,
      client_secret: config.client.secret,
      redirect_uri: config.client.redirectUri,
      code: req.query.code,
    })
    .end((error, response) => {
      if (error || response.statusCode !== 200) {
        return console.log('Error', error);
      }

      res.json(response.body);
    });
});

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')));

http.createServer(app).listen(port);

console.log(`${pkg.name} running on port ${port} 🎉`);
