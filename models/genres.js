const Joi = require('@hapi/joi');
const mongoose =require('mongoose');


const genreSchema = new mongoose.Schema({
    name: {type:String, minLength:3}
});

const Genre = mongoose.model('Genre',genreSchema);

function validateGenres(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenres;