//ติดต่อฐานข้อมูล //ดำเนินการกับDB

const slugify = require("slugify")
const tests = require("../model/tests")
const DATA = require("../model/tests")
const userDATA = require("../model/tests")
const space = require("../model/space")
//สร้างข้อมูล
exports.create=(req,res)=>{
    const {ID,PASSWORD,CONFIRM_PASSWORD,NAME} = req.body
    const slug = slugify(ID)
    //ตรวจสอบข้อมูล
    switch(true){
        case !ID:
            return res.status(400).json({error:"pls write your ID"})
            break;
        case !PASSWORD:
            return res.status(400).json({error:"pls write your PASSWORD"})
            break;
        case !CONFIRM_PASSWORD:
            return res.status(400).json({error:"pls confirm your password"})
            break;
        case (PASSWORD != CONFIRM_PASSWORD):
            return res.status(400).json({error:"pls check your password and confirm password"})
            break;
    }
    //บันทึกข้อมูล //,CONFIRM_PASSWORD,NAME,slug
    DATA.create({ID,PASSWORD,CONFIRM_PASSWORD,NAME,slug},(err,Data)=>{
        if(err){
            res.status(400).json({error:"have a same id"})
        }
        res.json(Data)
    }) 
}

//ดึงข้อมูล
exports.getAlldata = (req,res) => {

    const ID = req.headers.userid;
    const search = req.headers.search; 
    console.log({user:search})
    if(search[0] == "."){
        space.find({ID:ID,Type:{$regex:search}})
        .then(Alldata => {
        return res.json(Alldata)
    })}
    else{
    space.find({ID:ID,UserDataName:{$regex:search}})
    .then(Alldata => {
        return res.json(Alldata)
    })}
}
exports.getsingleDATA=(req,res)=>{
    const ID = req.headers.authorization
    userDATA.findOne({ID})
    .then(data => {
        return res.json(data)
    })
}

//ดึงข้อมูลที่สนใจอ้างอิงจาก slug
exports.mydata=(req,res)=>{
    const {slug} = req.params
    tests.findOne({slug}).exec((err,UserData)=>{
        res.json(UserData)
    })
}

exports.createspace=(req,res)=>{
    const {ID,UserDataName,UserDataPath,Type} = req.body
    space.create({ID,UserDataName,UserDataPath,Type},(err,newspace)=>{
        if(err){
            res.status(400).json(err)
        }
        else{
            return res.json(newspace)
        }
    })
}

exports.editname=(req,res)=>{
    const ID = req.body.ID
    const Edit = req.body.edit
    DATA.findOneAndUpdate({ID:ID},{$set:{NAME:req.body.edit}})
    .then(resp=>{
        return res.json(resp)
    })
    
}

