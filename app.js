const express = require("express");
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
require("dotenv").config()

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require('./routes/product')
// const braintreeRoutes = require('./routes/braintree');
// const orderRoutes = require('./routes/order');
const app = express();


// db
mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });


// middeleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes)
app.use('/api', productRoutes);
// app.use('/api', braintreeRoutes);
// app.use('/api', orderRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})