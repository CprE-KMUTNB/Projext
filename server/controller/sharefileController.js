const userDATA = require("../model/tests")
const space = require("../model/space")
const single_share_space = require("../model/sharesinglefile")

exports.singlecreate=(req,res)=>{
    //console.log(req.headers)
    const owner = req.headers.owner
    const FileName = req.headers.filename
    const FilePath = req.headers.filepath
    const Type = req.headers.filetype
    const Slug = req.headers.slugg
    const ShareTo = req.headers.shareto
    switch(true){
        case Slug === "":
            return res.status(404).json({error:"Unknow Link"})
            break;
    }

    single_share_space.create({owner,FileName,FilePath,Type,ShareTo,ShareTo,Slug},(err,Data)=>{
        if(err){
            res.status(400).json({error:"don't have slug"})
        }
        res.json(Data)
    }) 
}
exports.getSingleShare = (req,res) => {
    const owner = req.headers.owner
    const FileName = req.headers.filename
    const FilePath = req.headers.filepath
    const Type = req.headers.filetype
    const Slug = req.headers.slugg
    const ShareTo = req.headers.shareto
    if(ShareTo==""){
        single_share_space.find({owner,FileName,FilePath,Type,Slug})
        .then(data => {
        return res.status(200).json(data)
    })}

}
