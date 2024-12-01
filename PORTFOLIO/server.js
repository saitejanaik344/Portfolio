const express=require('express');
const mongoose=require('mongoose');
const app=express();
const articleRouter=require("./routes/articles")
const Article=require('./models/article')
const methodOverride=require('method-override');
require('dotenv').config();


const connectDB=async ()=>{
    try{
     const connect=await mongoose.connect('mongodb+srv://admin:admin@mohan.jxh8xre.mongodb.net/BlogApp?retryWrites=true&w=majority');
     console.log("Database connected",
     connect.connection.host,
     connect.connection.name
     );
     
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
connectDB();
const port=process.env.PORT;
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.set('view engine','ejs');
app.get("/",async (req,res)=>{
   const articles= await Article.find().sort({
    createdAt:'desc'
   });
   res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter); 

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
});
