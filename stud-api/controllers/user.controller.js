const Author = require('../models/User');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const secretKey =  "meanstk2021";
exports.register = async (req,res)=>{
    const authorSchema = joi.object({
        fullName:joi.string().required().min(3),
        email:joi.string().email().required(),
        password:joi.string().min(6).max(10)
    })
    try{
        let authorFields = await authorSchema.validateAsync(req.body)
        let author = await Author.findOne({email:authorFields.email});
        if(!author){
            author = new Author(authorFields);
            const salt = await bcrypt.genSalt(10);
            author.password = await bcrypt.hash(author.password,salt);
            await author.save();
            res.status(200).json({
                message:"Author registered successfully",
                author
            })
        }else{
            res.status(404).json({
                message:"Author already exists",
            })
        }
    }catch(err){
        res.status(404).json({
            message:"Something went wrong",
            error:err
        })
    }
    
}

exports.login =async (req,res)=>{
    const loginSchema=joi.object({
        email:joi.string().required(),
        password:joi.string().required()
    })

    try{
        const loginFields = await loginSchema.validateAsync(req.body);
        let user = await Author.findOne({email:loginFields.email})

        if(!user){
            res.status(404).json({
                message:"Username/Password doesn't exist"
            })
        }else {
            const is_match = await bcrypt.compare(loginFields.password,user.password)
            if(!is_match){
                res.status(404).json({
                    message:"Username/Password doesn't exist"
                })
            }else{
                const payload={
                    userdata:{
                        id:user._id
                    }
                }

                const token = await jwt.sign(payload,secretKey,{expiresIn:7200})
                res.status(200).json({
                    message:"Logged in successfully",
                    user:{id:user._id,name:user.fullName},
                    token
                })
            }
        }
    }catch(err){
        res.status(404).json({
            message:"Something went wrong",
            error:err
        })
    }
}