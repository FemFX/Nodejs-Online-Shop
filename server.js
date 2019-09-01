const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const ejs = require('ejs');
const flash      = require('connect-flash');
const session    = require('express-session');

const app = express();

//Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');

//DOTENV setup
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
//cors
app.use(cors());
//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//session
app.use(session({
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : false
})) 
app.use(flash()); 
//passport config 
require('./config/passport')(app)


app.use((req,res,next) => {
  res.locals.currentUser = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')  
  next()
})


//Routes
app.use('/', indexRouter); 
app.use('/user', userRouter)
app.use('/cart', cartRouter);

//Connect to db
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//Listening port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
