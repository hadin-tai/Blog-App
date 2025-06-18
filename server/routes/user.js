const {Router} = require('express');
const User = require('../models/user');
const { validateToken } = require("../services/authentication");

const router = Router();

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    
    try {
        const user = await User.create({
            fullName,
            email,
            password
        });
        
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
                
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
    
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {        
        const token = await User.matchPasswordAndGenerateToken(email, password);
        
        res.cookie('token', token, {
            httpOnly: true,     
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
            maxAge: 24 * 60 * 60 * 1000, 
        });        
        
        return res.status(200).json({
            message: 'Login successful',
            token: token, 
        });
        
    } catch (error) {
        return res.status(401).json({
            error: 'Incorrect Email or Password',
        });
    }
});

router.get('/getUser', (req, res) => {
  const token = req.cookies['token'];
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {    
    const userPayload = validateToken(token);    
    
    return res.status(200).json({
      _id: userPayload._id,
      fullName: userPayload.fullName,
      email: userPayload.email,
    });

  } catch (error) {
    console.error('Invalid token', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/logout', (req, res) => {
    
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;














    




        






