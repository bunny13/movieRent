const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customer = require('./routes/customer');
const movie = require('./routes/movies');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genres')
    .then(() => console.log("Connected to Mongo"))
    .catch((err) => console.log(`Mongo Error:${err}`))

//Middleware
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customer',customer);
app.use('/api/movies',movie);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to PORT....:${port }`));


