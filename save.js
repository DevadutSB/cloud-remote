process.on('message',(filters)=>{
    if(filters.step){
        filters.step = steps[filters.step]
    }
    const data = filter(filters)
    process.send(data)
    process.exit()
})