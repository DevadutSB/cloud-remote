var level    = require('level').Level
var sublevel = require('level-sublevel')

let db;

function create_db(path,type='json'){
    db = new level(path,{
        valueEncoding:type
    })
}

async function update_db(data){
    let err;
    await db.put(data['matchID']+data['player'],{
        "score":data['score'],
        "warn":data['warn'],
        "penalty":data['penalty']
    },(err)=>{err=err})
    if(!err)
    console.log(data,"Saved succesfully")
}

async function get_data(matchID){
    let data = await db.get(matchID)
    return data
}

module.exports = {
    db:db,
    create_db:create_db,
    update_db:update_db,
    get_data:get_data
}