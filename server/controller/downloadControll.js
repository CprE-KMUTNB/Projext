const space = require("../model/space")
exports.getDATA =(req,res)=>{
    const auth = req.headers.authorization;
    //console.log({"headers":auth})
    const split = auth.split(",")
    const name = split[0]
    const path = "./"+split[1]
    const type = split[2]
    //console.log(split[0])
    //console.log(split[1])
    //console.log(split[2])

    switch(true){
        case String(type) == ("File folder") :
            const file_path_ff = String(path) + ".zip"
            //console.log(file_path_ff)
            return res.download(file_path_ff)

        case String(type) != ("File folder") :
            const file_path = String(path)+ String(type)
            //console.log(file_path)
            return res.download(file_path)
    }
}
exports.testDelete =(req,res)=>{
    const path = req.headers.userdatapath
    const type = req.headers.type
    const full_path = './'+ path.concat(type)
    //console.log({"path":path})
    //console.log({"type":type})
    //console.log({"full_path":full_path})

    const fs = require('fs')   
    
    space
    .findOneAndDelete({UserDataPath:req.headers.userdatapath})
    .then(async(resp) =>{
        await fs.unlink(full_path,(err)=>{
            if(err){
                return res.json(err)
            }})
        return res.status(200).json("Delete complete")
    })
}