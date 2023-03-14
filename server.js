const compression = require('compression'); //speed vroom
const express     = require('express');
var http          = require('http');
var https         = require('https');
const {fork}      = require("child_process")
const app         = express();

app.use(compression());

app.get('/', (req, res) => {
    const child = fork("save.js")
    setImmediate(() => {
      try {
        child.send(JSON.parse(req.query.params))
        
      } catch (e) {
        res.status(400).send('Invalid JSON string')
      }
    })
    child.on("message",(data)=>{
        res.json(data)
    })
})

app.listen(PORT,()=>{
    console.log("App Started at ",new Date().toString.split(" ")[4],"at port",PORT)
})

http.globalAgent.maxSockets  = Infinity; //speed vroom
https.globalAgent.maxSockets = Infinity; //speed vroom