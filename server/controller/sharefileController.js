const userDATA = require("../model/tests")
const space = require("../model/space")
const single_share_space = require("../model/sharesinglefile")

exports.checkshare=(req,res)=>{
    const owner = req.headers.owner
    const FilePath = req.headers.filepath

    single_share_space.findOne({owner:owner,FilePath:FilePath})
    .then(resp=>{
        if(!resp){
            return res.json("NO_DATA")
        }
        else{
            return res.json(resp.Links)
        }
    })

}

exports.singlecreate=(req,res)=>{
    //console.log(req.headers)
    const owner = req.headers.owner
    //console.log({owner:owner})
    const FileName = req.headers.filename
    //console.log({FileName:FileName})
    const FilePath = req.headers.filepath
    //console.log({FilePath:FilePath})
    const Type = req.headers.filetype
    //console.log({Type:Type})
    const Slug = req.headers.slugg
    const ShareTo = req.headers.shareto
    const Links = req.headers.link
    //console.log({Links:Links})

    switch(true){
        case Slug === "":
            return res.status(404).json({error:"Unknow Link"})
            break;    
    } 
    single_share_space.findOne({owner:owner,FilePath:FilePath})
        .then(resp => {
            if(!resp){
                single_share_space.create({owner,FileName,FilePath,Type,ShareTo,ShareTo,Slug,Links},(err,Data)=>{
                    if(err){
                        res.status(400).json({error:"don't have slug"})
                    }
                    return res.json(Data.Links)
                })
            }
            else{
                return res.json(resp.Links)
            }
        })
}
exports.getSingleShare = (req,res) => {
    const owner = req.headers.owner
    const FileName = req.headers.filename
    const FilePath = req.headers.filepath
    const Type = req.headers.filetype
    const Slug = req.headers.slugg
    const ID = req.headers.nowid
    //console.log({owner,FilePath,Slug})

    single_share_space.findOne({owner:owner,Slug:Slug})
    .then(resp=>{
        //console.log({'resp':resp})
        if(resp.ShareTo==''){
            return res.status(200).json(resp)
        }
        else if(resp.ShareTo!=''){
            if(ID == resp.ShareTo){
                return res.status(200).json(resp)
            }
            else if(ID == owner){
                return res.status(200).json(resp)
            }
            else if(!ID){
                return res.json("You don't have access this file!")
            }
            else{
                return res.json("You don't have access this file!")
            }
        }
    })    
}

