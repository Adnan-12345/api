const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
//const fs=require('fs');
const postController = require('../controllers/post.controller');
//Routes does not require authentication

router.get('/',postController.listPosts);

//Routes require authentication
router.post("/save",auth,postController.createPost);


router.put("/update/:id",auth,postController.updatePost);

router.delete('/delete/:id',auth,postController.delPost);

router.get("/:authorid",auth,postController.getPostByAuthor);

module.exports = router;
