const jwt = require('jsonwebtoken'); 
const secretKey =  "meanstk2021";
const auth =async (req,res,next)=>{
    if(req.header('x-auth-token')){
        const token = req.header('x-auth-token')
        try{
            const match = await jwt.verify(token,secretKey);
            next();
        }catch(err){
            res.status(401).json({
                message:"Unauthorised Request! Bad token"
            })
        }

    }else{
        res.status(401).json({
            message:"Unauthorised Request! Token missing"
        })
    }
}
module.exports = auth;