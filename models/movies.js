const mongoose = require('mongoose');
const { genreSchema } = require('./genres');
const Joi = require('@hapi/joi');


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minLength:3,
        maxLength:50
    },
    genre:{
        type:genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required:true,
    },
    dailyRentalRate:{
        type:Number,
        require:true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovies(movie){
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        genreId:Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    });
    return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovies;