'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const pkg = require('./package.json');

var app = express();
var port = process.env.PORT || 2020;

app.set('version', pkg.version);
app.set('port', port);

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendfile('index.html');
});

http.createServer(app).listen(port);
console.log(`🎉 ${pkg.name} running on port ${port}.`);
