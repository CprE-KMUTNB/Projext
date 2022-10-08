const jwt = require("jsonwebtoken")
const tests = require("../model/tests")

exports.login = (req,res) => {

    const {ID,password} = req.body ;
    const token = jwt.sign({ID},process.env.JWT_SECRET,{expiresIn:'1d'});

    tests.findOne({ID})
    .then(userid => {
        if (!userid) {return res.status(404).json({error:"Not Found ID"}).end();}

        else if (userid){
            if (!password){return res.status(404).json({error:"pls enter password"}).end();}
            else if(password != userid["PASSWORD"]){
                return res.status(404).json({error:"Try again"})
            }
            else{
                return res.status(200).json({token,ID})
            }   
        }      
    })
    .catch(err => (next(err),res.json({error:"Error"})))
}
    