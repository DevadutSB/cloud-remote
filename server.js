const compression = require('compression'); //speed vroom
const express     = require('express');
var http          = require('http');
var https         = require('https');
const {fork}      = require("child_process")
const app         = express();
const PORT        = 3000;
let out           = ""
let {
    db,
    update_db,
    get_data,
    create_db,
    init_db  
}                = require("./db/level");

async function createServer(){

  await create_db("./games")
  
  app.use(compression());

  app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/score_board/public/landing.html")
  })

  app.get('/init/:matchID/:player1/:player2',async(req, res)=>{
      let code = await init_db(req.params);
          out  = code==200 ? "sucess" : "failed"
      res.json({"status":"init " + out});
  })

  app.get('/put/:matchID/:judgeID/:player/:score/:warn/:penalty', async(req, res) => {
    let code = await update_db(req.params)
    console.log(code,req.params)
        out = code==200 ? "sucess" : "failed "
    res.json({"status":"update " + out});
  })
  
  app.get('/get/:matchID',async(req,res) => {
    console.log('id : ',req.params)
    const data=await get_data(req.params.matchID)
    out = JSON.stringify(data).length!=0 ? data : {"err":"no matches found"}
    res.json(out)
  })

  app.listen(PORT,()=>{
      console.log("App started at port",PORT)
  })

}

createServer()

http.globalAgent.maxSockets  = Infinity; //speed vroom
https.globalAgent.maxSockets = Infinity; //speed vroom