const { populate } = require('../models/Post');
const Post=require('../models/Post');
exports.listPosts=async (req,res)=>{
    try{
        let posts = await Post.find().populate('authorId');
        if(!posts)
        {
            posts=[];
        }
        res.status(200).json({
            message:"Data fetched succesfully",
            postsData:posts
        })
    }catch(err){
        res.status(404).json({
            message:"Something went wrong",
            error:err
        })

    }
}

exports.createPost=async (req,res)=>{
    const studObj = {
        contactPhone : req.body.cphone,
        contactType : req.body.ctype,
        authorId : req.body.cname,
        contactDate : req.body.cdate
    }
    try{
        const post = new Post(studObj);
        await post.save();
        res.status(200).json({
        message:"Data saved succesfully",
        postsData:post
        })
    }catch(err){
        res.status(404).json({
            message:"Something went wrong",
            error:err
        })
    }
}

exports.updatePost=async (req,res)=> {
    const id = req.params.id;

    const studObj = {
        contactPhone : req.body.cphone,
        contactType : req.body.ctype,
        authorId : req.body.cname,
        contactDate : req.body.cdate
    }
    try{
        const updatedPost = await Post.findByIdAndUpdate(id,{$set:studObj});
        if(updatedPost==null)
        {
            res.status(404).json({
                message:"Data didnt updated succesfully/ID not found"
            })
        }else{
            res.status(200).json({
                message:"Data updated successfully",
            })
        }
    }catch(err){
        res.status(404)({
            message:"Something went wrong",
            error:err
        })
    }
        
}

exports.delPost=async (req,res)=>{
    const id = req.params.id;
    try{
        const deletedPost = await Post.findByIdAndDelete(id);
        if(deletedPost==null)
        {
            res.status(404).json({
                message:"Data didnt deleted succesfully/ID not found"
            })
        }else{
            res.status(200).json({
                message:"Data Deleted Successfully",
            })
        }

    }catch(err){
        res.status(404)({
            message:"Something went wrong",
            error:err
        })

    }
}

exports.getPostByAuthor=async (req,res)=>{
    try{
        let posts = await Post.find({authorId:req.params.authorid}).populate('authorId');
        if(!posts){
            posts=[]
        }
        res.status(200).json({
            message:"Data fetched successfully",
            postsData:posts
        })
    }catch(err){
        res.status(404).json({
            message:"Something went wrong",
            error:err
        })

    }
    
}