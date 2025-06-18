const express = require('express');
const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const cookieParser = require('cookie-parser');  
const Blog = require('./models/blog');

const mongoose = require('mongoose');

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("MongoDB connected Successfuly"))

const app = express();

const PORT = process.env.PORT; //cloud provider will provide PORT dynamicaly, if not then run on 80(now);

const cors = require( 'cors');
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());  

app.use('/user',userRoute); 
app.use('/blog',blogRoute); 

app.get('/', async(req,res)=>{
    
    const allBlogs = await Blog.find({}); 
    res.render('home.ejs',{
        user: req.user,
        blogs: allBlogs
    });
})

app.listen(PORT,()=> console.log(`server started at ${PORT}`));
