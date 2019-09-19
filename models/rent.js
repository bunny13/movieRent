const mongoose = require('mongoose');
const Joi = require("@hapi/joi");


const rentSchema = new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minLength: 3,
                maxLength: 50
            },
            isGold:{
                type: Boolean,
                default: false
            },
            phone: {
                type:String,
                required: true,
                minLength: 10,
                maxLength: 10
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                trim: true,
                required: true,
                minLength:3,
                maxLength:50
            },
            dailyRentalRate:{
                type:Number,
                required:true
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        default: Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type: Number,
        min:0
    }
});

const Rent = mongoose.model('Rent',rentSchema);


function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });
    return schema.validate(rental);
}

module.exports.Rent = Rent;
module.exports.RentSchema = rentSchema;
module.exports.validate = validateRental;