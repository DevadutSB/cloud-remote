const axios  = require('axios');
let score    = [0,0,0,0,0,0]

function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
let c=0
async function test(){
    await axios.get("http://localhost:3000/get/200")
    await axios.get("http://localhost:3000/init/200/1/2")
    while(true){
        await axios.get(`http://localhost:3000/put/200/1/1/${score[0]}/${score[2]}/${score[4]}`)
        await axios.get(`http://localhost:3000/put/200/1/2/${score[1]}/${score[3]}/${score[5]}`)
        let rand_int = rand(1,12)
        for(i=0;i<6;i++){
            if(rand_int==(i+1))
             score[i]++
        }
        for(i=6;i<12;i++){
            if(rand_int==(i+1))
             score[i]--
        }
        await delay(1000)
        console.log(c)
        c++
    }
}

test()