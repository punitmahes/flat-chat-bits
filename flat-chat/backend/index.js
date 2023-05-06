const express = require('express')
const app = express()
const userRoutes = require('./routes/user');
const flatRoutes = require('./routes/flat');
const mongoDb = require("./database")

//encoding for the secured api requestd --work yet to be done
const uuid = require('uuid');
const apiKey = 1234;

//port-address for local env
const port = 5000

//Connect to database
mongoDb()

//Defining API's for request
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/flat', flatRoutes);

app.get('/', (req, res) => {
  res.send('Hey, I am here')
})

app.listen(port, () => {
  console.log(`Example app listening on port  ${port}`)
})