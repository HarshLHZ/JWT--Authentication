const express = require('express')    //defining express for the express library.
const app = express()   //defining the express function.
const bcrypt = require('bcrypt')   // defining a variable for becrpt library(asynchronous library)

app.use(express.json())  //to accept json

const users = []      //creating user variable for storing the user.

app.get('/users', (req, res) => {        //creating users route with a parameter request and response
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {    //comparison of password
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

app.listen(3000)