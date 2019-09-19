const express = require('express');
const route = express.Router();
const {Rent, RentSchema,  validate} = require('../models/rent');
const {Movie} = require("../models/movies");
const {Customer} = require("../models/customer");
const fawn = require('fawn');
const mongoose = require('mongoose');

fawn.init(mongoose);

route.get("/", async(req, res) => {
    const result = await Rent.find();
    res.status(200).send(result);
});

route.post("/", async(req, res) => {
    const { error } = validate(req.body);
    if(error){
        res.status(400).status(`Validation error:${error.details[0].message}`);
        return;
    }
    const resMovie = await Movie.findById(req.body.movieId);
    const resCust = await Customer.findById(req.body.customerId);
    if(!resMovie){
        res.status(500).send("No Movie Found!!");
    }
    if(!resCust){
        res.status(500).send("No Customer Found!!");
    }

    if(resMovie.numberInStock == 0){
        res.status(200).send("Movie not in stock")
    }

    const newRent = new Rent({
        customer:{
            name:resCust.name,
            isGold: resCust.isGold,
            phone: resCust.phone
        },
        movie:{
            title: resMovie.title,
            dailyRentalRate: resMovie.dailyRentalRate
        },
        dateReturned:req.body.dateReturned,
        rentalFee: req.body.rentalFee
    });

    new fawn.Task()
        .save('rents',newRent)
        .update('movies',{_id:resMovie._id},{
            $inc:{
                numberInStock: -1
            }
        })
        .run()
        .then((result) => {
            res.status(200).send(result);
        });
});

route.delete("/:id", async(req, res) => {
    console.log('here');
   if(!checkValidId(req.params.id)){
    throw new Error('Invalid Id!!');
   }
   
   const result = await Rent.deleteOne({_id:req.params.id});
   res.status(200).send(result);
});

route.get("/:id", async(req, res) => {
    const result = await Rent.findById(req.params.id);
    res.status(200).send(result);
});

const checkValidId = (id) => {
    if(!id.match(/^[A-Za-z0-9]{24}$/g)){
        return false
    }
    return true;
}

module.exports = route;