const {Router} = require('express')
const router = Router();

const path = require('path');
const multer = require('multer');
const fs = require('fs');

const Blog = require('../models/blog');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.resolve('../client/public/uploads'));
    },
    filename: function (req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
})

const upload = multer({storage: storage})


router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ status: 'active' }).populate('userId', '-password');

    res.status(200).json({ posts });

  } catch (error) {
    console.error('Get All Posts Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate('userId', '-password');  

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({
      post,
    });
  } catch (error) {
    console.error('Get Post Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    fileUrl: `/uploads/${req.file.filename}`,
  });
});

router.post('/', async (req, res) => {

    try {
        const { title, slug, content, featuredImage, status, userId } = req.body;
        
        if (!title || !slug || !content || !featuredImage || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
    const newPost = new Blog({
      title,
      slug,
      content,
      featuredImage,
      status,
      userId,
    });

    await newPost.save();

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });

  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




router.put('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        slug: req.body.slug, 
        content: req.body.content,
        featuredImage: req.body.featuredImage,
        status: req.body.status,
      },
      { new: true } 
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(updatedPost);

  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});



router.delete('/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  
  if (!fileName) {
    return res.status(400).json({ error: 'File name is required' });
  }
  
  const filePath = path.join(__dirname, '../../client/public/uploads', fileName);
  
  try {
    
    if (fs.existsSync(filePath)) {
      // console.log( fileName)
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'File deleted successfully' });
    } else {
      // console.log('file not found at,', filePath)
      return res.status(404).json({ error: 'File not found' });
    }

  } catch (error) {
    
    return res.status(500).json({ error: 'Internal server error' });
  }
});



router.delete('/delete/:id', async (req, res) => {
  try {
    // console.log("hii")
    const postId = req.params.id;    
    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    await Blog.findByIdAndDelete(postId);

    return res.status(200).json({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('Delete Post Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router