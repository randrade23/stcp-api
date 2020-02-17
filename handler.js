'use strict';

const serverless = require('serverless-http');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios').default;

const STCP_ENDPOINT = "https://www.stcp.pt/pt/itinerarium/callservice.php";

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send("STCP!");
})

app.get('/buses', async (req, res) => {
  try {
    let request = { action: 'lineslist', service: '1' };

    let busList = (await (await axios.get(STCP_ENDPOINT, { params: request })).data);
    busList = busList["records"];
    
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(busList));
  }
  catch (error) {
    res.status(500);
    res.send(error);
  }
})

app.get('/stops/:bus/:direction', async (req, res) => {
  try {
    let request = { action: 'linestops', lcode: req.params.bus, ldir: req.params.direction };

    let stopsList = (await (await axios.get(STCP_ENDPOINT, { params: request })).data);
    stopsList = stopsList["records"];
    
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(stopsList));
  }
  catch (error) {
    res.status(500);
    res.send(error);
  }
})

module.exports.service = serverless(app);