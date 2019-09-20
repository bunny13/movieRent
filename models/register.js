const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
});

const User = mongoose.model('User',userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(user);
}


module.exports.User = User;
module.exports.validate = validateUser;