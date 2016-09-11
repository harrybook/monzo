'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const pkg = require('./package.json');

const app = express();
const port = process.env.PORT || 2020;

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')));

http.createServer(app).listen(port);

console.log(`${pkg.name} running on port ${port} 🎉`);
