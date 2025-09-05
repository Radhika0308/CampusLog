
import fs from 'fs'
import mongoose from 'mongoose'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';


export const addBlog = async(req, res)=>{


    try{
        const {title, subTitle, description, category , isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        //Check if all fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({success: false , message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        //Upload Image to imagekit

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder : "/blogs"
        })

        // optimise through imagekit URL transformation
       const optimizedImageUrl = imagekit.url({
         path : response.filePath,
         transformation : [
            {quality : 'auto'}, 
            {format : 'webp'},
            {width : '1280'}
         ]
       });

       const image = optimizedImageUrl;
       await Blog.create({
        title, subTitle, description,category , image , isPublished
       })

   res.json({success : true , message: "Blog added successfully"})


    } catch (error){
     res.json({success : false, message : error.message})
    }
}

export const getAllBlogs = async (req,res) =>{
    try{
        console.log("Starting getAllBlogs...");
        
        const blogs = await Blog.find({isPublished: true})
            .maxTimeMS(5000) // 5 second timeout
            .lean(); // Use lean() for better performance
        
        console.log("Found blogs:", blogs.length);
        
        res.json({success : true ,blogs})
    } catch(error){
        console.log("Error in getAllBlogs:", error.message);
        res.json({success : false, message : error.message})
    }
}

export const getBlogById = async(req,res)  => {
    try {
      const {blogId} = req.params;
      const blog = await Blog.findById(blogId)

      if(!blog){
        return res.json({success: false, message : "Blog Not Found"})
      }
      res.json({success : true ,blog})


    } catch (error){
              res.json({success : false, message : error.message})

    }

}

export const deleteBlogById = async(req,res)  => {
    try {
      const {id} = req.body;
      
      await Blog.findByIdAndDelete(id);

      // To delete all the comments associated with the blog
      await Comment.deleteMany({blog: id});
      res.json({success: true , message: 'Blog deleted successfully'})


    } catch (error){
              res.json({success : false, message : error.message})

    }

}

export const togglePublish = async (req,res) => {

    try{
        const {id} = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
  return res.json({ success: false, message: "Blog not found" });
}

        blog.isPublished = !blog.isPublished;
        await blog.save();
         res.json({success: true , message: 'Blog status updated'})


    } catch(error){
        res.json({success : false , message : error.message})
    }
}

export const addComment = async(req,res) => {

    try{
       const {blog,name,content} = req.body;
       await Comment.create({blog,name,content});
       res.json({success: true, message: 'Comment has been added for review'})
    } catch(error){
        res.json({success: false, message : error.message})
    }
}

export  const getBlogComments = async(req,res) => {
    try{
        
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved : true}).sort({createdAt: -1});

        res.json({success: true, comments})

    } catch(error){
         res.json({success: false, message : error.message})
    }
}

export const generateContent = async(req,res) => {
   try {
       const {prompt} = req.body;
      const content =  await main(prompt + 'Generate a blog content for this topic in simple text format')

      res.json({success: true, content})
   } catch (error) {
      res.json({success: false, message : error.message})
   }
}