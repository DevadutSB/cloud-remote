const compression = require('compression'); //speed vroom
const express     = require('express');
var http          = require('http');
var https         = require('https');
const {fork}      = require("child_process")
const app         = express();
const PORT        = 3000;
const IP          = require('ip');
let palyers       = [];
let temp_json     = {};

let {
    db,
    update_db,
    get_data,
    create_db
  }               = require("./db/init");
const { json } = require('express');

async function createServer(){

  create_db("./games")
  
  app.use(compression());

  app.get('/put/:matchID/:player/:score/:warn/:penalty', async(req, res) => {
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress +":"+  IP.address() 
    update_db(req.params)
    palyers.push(req.params.player)
    res.send(req.params);
  })
  
  app.get('/get/:matchID',(req,res) => {
    console.log('id : ',req.params)
    palyers.forEach(async(n)=>{
      let data = await get_data(req.params.matchID+n);
      temp_json[n] = data
    })
    res.json(temp_json)
  })

  app.listen(PORT,()=>{
      console.log("App started at port",PORT)
  })
  
  http.globalAgent.maxSockets  = Infinity; //speed vroom
  https.globalAgent.maxSockets = Infinity; //speed vroom
}

createServer()