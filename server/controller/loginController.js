//ติดต่อฐานข้อมูล //ดำเนินการกับDB

const slugify = require("slugify")
const DATA = require("../model/tests")
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
            res.status(400).json({error:err})
        }
        res.json(Data)
    })
}