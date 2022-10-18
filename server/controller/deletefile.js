const space = require("../model/space")
exports.deletefile =(req,res)=> {
    const fs = require('fs')
    const path = req.body.UserDataPath
    const type = req.body.Type
    const changepath = "./" + path.split("\\",2)[0] + "/" + path.split("\\")[1] 
    const truepath = changepath + type
    console.log(changepath)
    try{
        space.findOneAndDelete(
            { "UserDataPath":path  });
        fs.unlinkSync(truepath)
        res.status(201).send('Deleted'); 
    }catch(error) {
        res.status(400).send(error.message);
    }
}

