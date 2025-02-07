const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Create Schema for Mongoose
const custSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    phone: {
        type:String,
        required: true,
        minLength: 10,
        maxLength: 10
    }
});

const Customer = mongoose.model('Customer',custSchema);

const validateCustomer = (obj) => {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10).max(10).required()
    });
    return schema.validate(obj);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;