const express = require('express')
const app = express()
const session = require('express-session');
const cors = require('cors')
const passport = require('passport');
const userRoutes = require('./routes/user');
const flatRoutes = require('./routes/flat');
const authRoutes = require('./routes/auth')
const mongoDb = require("./database")

//configure passport.js
require('./passport')

const SESSION_SECRET = "1234"
//encoding for the secured api requestd --work yet to be done
const uuid = require('uuid');
const apiKey = 1234;

//port-address for local env
const port = process.env.PORT || 3001;

//Connect to database
mongoDb()

//Defining API's for request
app.use(express.json());
app.use(cors());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth',authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/flat', flatRoutes);

app.get('/user', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.session.user == null) {
    res.status(401).send('Unauthorized');
  } else {
    res.json({ 'punit':'punit'});
  }
});

app.get('/authenticated',(req,res)=>{
  res.send('I am authenticated')
})

app.listen(port, () => {
  console.log(`Example app listening on port  ${port}`)
})