'use strict';

const serverless = require('serverless-http');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios').default;

const STCP_BUS_LIST_API = "https://www.stcp.pt/pt/itinerarium/callservice.php?action=lineslist&service=1";

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send("STCP!");
})

app.get('/buses', async (req, res) => {
  try {
    let busList = (await (await axios.get(STCP_BUS_LIST_API)).data);
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

module.exports.service = serverless(app);