const axios  = require('axios');
let express  = require('express');
let app      = express();

app.use(express.static('public'))
app.use(express.urlencoded({ limit:'10mb',extended: false }))
// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/',async(req, res)=>{
  let data = await axios.get("http://localhost:3000/get/200")
  data     = data.data
  console.log(data)
  let keys = Object.keys(data)
  let data_0 = [
    0,
    data[keys[0]].score,
    data[keys[0]].warn,
    data[keys[0]].penalty
  ]
  let data_1 = [
    1,
    data[keys[1]].score,
    data[keys[1]].warn,
    data[keys[1]].penalty
  ]

  res.render('index',{
     data_0:data_0.join(","),
     data_1:data_1.join(",")
  });
});

app.listen(8080);
console.log('Server is listening on port 8080');

