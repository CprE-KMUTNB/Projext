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
    const list_path = (req.headers.userdatapath).split("\\",2)
    const path = list_path[0]+"/"+list_path[1]
    const type = req.headers.type;
    const realpath = "./" + path + type
    const fs = require('fs')
    console.log({"realpath":`./${path}${type}`})
    space
    .findOneAndDelete({UserDataPath:req.headers.userdatapath})
    .then(async(resp) =>{
        await fs.unlink(`./${path}${type}`,(err)=>{
            if(err){
                return res.json(err)
            }})
        return res.status(200).json("Delete complete")
    })
    
}