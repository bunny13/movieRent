const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customer = require('./routes/customer');
const movie = require('./routes/movies');
const rent = require('./routes/rent');
const register = require('./routes/register');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genres')
    .then(() => console.log("Connected to Mongo"))
    .catch((err) => console.log(`Mongo Error:${err}`))

//Middleware
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customer',customer);
app.use('/api/movies',movie);
app.use('/api/rent',rent);
app.use('/api/register',register);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to PORT....:${port }`));


