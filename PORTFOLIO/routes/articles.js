const express=require('express');
const router=express.Router();
const Article=require('../models/article')


router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new Article()})
})

router.get('/:id',async (req,res)=>{
    const article= await Article.findById(req.params.id);
    if(article==null) res.redirect('/');
   res.render('articles/show',{article:article});
})

router.post('/',async (req,res)=>{
     let article=new Article({
         title:req.body.title,
         description:req.body.description,
         markdown:req.body.markdown,
         createdAt:new Date(),

     })
     try{
        article=await article.save();
        res.redirect(`/articles/${article.id}`)
     }catch(error){
        console.log(error);
           res.render('articles/new',{article:article}  )
     }
})

 router.delete('/:id',async (req,res)=>{
       await Article.findByIdAndDelete(req.params.id);
       res.redirect('/')
 })
module.exports=router;