require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username : 'Jenny',
        password : 'test123'
    },
    {
        username : 'Jessica',
        password : 'takashi123'
    }
]
// app.get('/posts', authenticateToken, (req, res) => {
//     res.json(posts.filter(post => post.username === req.user.name));

// })

// app.get('/login', (req,res) => {
//     //Authenticating User

//     const username = req.body.username;
//     const user = { name: username } 
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({ accessToken: accessToken })
// })

// function authenticateToken(req, res, next) {
//     const authHeader = req.header['authorization']
//     //If we have auth header please return the auth header token else undefined.
//     const token = authHeader && authHeader.split(' ')[1]

//     if(token === null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })

// }
// app.listen(35);
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
  })
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
  
  app.listen(1000)