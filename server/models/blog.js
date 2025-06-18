const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String, // e.g. `/uploads/filename.jpg`
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    ref: 'user',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Blog', postSchema);





// // const {Schema,model} = require('mongoose');
// const  mongoose = require("mongoose");
// // const {User} = require('./user')

// const blogSchema = new mongoose.Schema({
//     title:{
//         type: String,
//         required: true
//     },
//     body:{
//         type: String,
//         required: true
//     },
//     coverImageURL :{
//         type: String,
//         required: false
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//     }
// },{timestamps: true}
// );


// const Blog = mongoose.model('blog', blogSchema);

// module.exports = Blog;