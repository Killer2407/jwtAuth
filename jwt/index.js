
//dotenv.config();

const express = require('express');
//const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();

let PORT = process.env.PORT || 10;
app.listen(PORT, () => {
    console.log('Welcome');
})

app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
  
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        username: 'Jenny',
        password: 'test123'
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});
  
// Verification of JWT
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Welcome to the programming world");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});