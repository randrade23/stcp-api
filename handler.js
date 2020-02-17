'use strict';

const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('STCP!')
})

module.exports.service = serverless(app);