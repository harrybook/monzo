const express = require('express');
const http = require('http');
const nunjucks = require('nunjucks');
const path = require('path');
const request = require('superagent');
const config = require('./config');
const pkg = require('./package.json');

const app = express();
const port = process.env.PORT || 2020;

nunjucks.configure(path.resolve(__dirname), {
  autoescape: true,
  express: app,
});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.get('/token', (req, res) => {
  const grantType = req.query.grant_type || 'authorization_code';
  const tokenType = grantType === 'refresh_token' ? 'refresh_token' : 'code';
  const token = grantType === 'refresh_token' ? req.query.refresh_token : req.query.code;
  request
    .post('https://api.monzo.com/oauth2/token')
    .type('form')
    .send({
      grant_type: grantType,
      client_id: config.monzo.id,
      client_secret: config.monzo.secret,
      redirect_uri: config.monzo.redirectUri,
      [tokenType]: token,
    })
    .end((error, response) => {
      if (error || response.statusCode !== 200) {
        // TODO Handle error.
      }

      return res.json(response.body);
    });
});

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('*', (req, res) => res.render('index', { config }));

http.createServer(app).listen(port);

console.log(`${pkg.name} running on port ${port} 🎉`);
