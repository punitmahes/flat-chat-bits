const express = require('express')
const app = express()
const mongoDb = require("./database")
const port = 5000

//Connect to database
mongoDb()

app.get('/', (req, res) => {
  res.send('Hey, I was here')
})

app.listen(port, () => {
  console.log(`Example app listening on port  ${port}`)
})