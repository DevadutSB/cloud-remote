let level    = require('level').Level
let sublevel = require('level-sublevel')
let palyers       = [];
let temp_json     = {};

let db;

function create_db(path,type='json'){
    db = new level(path,{
        valueEncoding:type
    })
}

async function init_db(params){
    let err;
    palyers.push(params['player1'] || 1);
    palyers.push(params['player2'] || 2);

    palyers.forEach(async(n)=>{
        await await db.put(params['matchID']+n,{
            "score":0,
            "warn":0,
            "penalty":0
        })
    },(err)=>{err=err})

    if(!err)
    return 200
    else
    return err
}

async function update_db(params){
    let err;
    palyers.push(params['player'])
    await db.put(params['matchID']+params['player'],{
        "score":params['score'],
        "warn":params['warn'],
        "penalty":params['penalty']
    },(err)=>{err=err})
    if(!err)
    return 200
    else
    return err
}

async function get_data(matchID){
    let data;
    palyers.forEach(async(n)=>{
        data = await db.get(matchID+n);
        temp_json[n] = data
    })
    return temp_json
}

module.exports = {
    db:db,
    init_db:init_db,
    create_db:create_db,
    update_db:update_db,
    get_data:get_data
}