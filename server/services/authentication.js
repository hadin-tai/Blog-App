const JWT = require('jsonwebtoken');

const secret = "$uperMan@123";

function createTokenForUser(user){ //cant use arrow function here
    const payload={
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    }

    const token = JWT.sign(payload, secret);
    
    return token;
}

function validateToken(token){  //cant use arrow function here
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports ={
    createTokenForUser,
    validateToken
};