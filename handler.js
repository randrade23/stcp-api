'use strict';

const serverless = require('serverless-http');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const helpers = require('./helpers');

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send("STCP!");
})

app.get('/buses', async (req, res) => {
  try {
    let busList = await helpers.getLines('1');
    
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(busList));
  }
  catch (error) {
    res.status(500);
    res.send(error);
  }
})

app.get('/directions/:bus', async (req, res) => {
  try {
    let directionsList = await helpers.getDirections(req.params.bus); 
    
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(directionsList));
  }
  catch (error) {
    res.status(500);
    res.send(error);
  }
})

app.get('/stops/:bus', async (req, res) => {
  try {
    let stopsResult = [];

    let directions = await helpers.getDirections(req.params.bus);
    directions = directions.map((value, index, array) => value.dir);

    for (const direction of directions) {
      let stopsList = await helpers.getStops(req.params.bus, direction);
      stopsResult.push({direction, stopsList});
    }

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(stopsResult));
  }
  catch (error) {
    res.status(500);
    res.send(error);
  }
})

app.get('/stops/:bus/:direction', async (req, res) => {
  try {
    let stopsList = await helpers.getStops(req.params.bus, req.params.direction);
    
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(stopsList));
  }
  catch (error) {
    res.status(500);
    res.send(error);
  }
})

app.get('/stop/:code', async (req, res) => {
  try {
    let stopInfo = await helpers.getStop(req.params.code);
    
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(stopInfo));
  }
  catch (error) {
    res.status(500);
    res.send(error);
  }
})

module.exports.service = serverless(app);