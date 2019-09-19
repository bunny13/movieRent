const express = require('express');
const route = express.Router();
const {Customer, validate} = require('../models/customer');


route.get('/', async(req, res) => {
    const allCust = await Customer.find();
    if(!allCust){
        res.status(200).send("No Customer Exist");
        return;
    }
    res.status(200).send(allCust);
});

route.get('/:id', async(req, res) => {
    const allCust = await Customer.findById(req.params.id);
    if(!allCust){
        res.status(200).send("No Customer Exist");
        return;
    }
    res.status(200).send(allCust);
});

//Create New Customer
route.post('/', async(req, res) => {
    const reqBody = req.body;
    const {error} = validate(reqBody);
    if(error){
        res.status(400).send(`Validation Error: ${error.details[0].message}`);
        return;
    }
    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    try{
        const result = await customer.save();
        res.status(200).send(result);
    }
    catch (err){
        console.log(`Error is :${err}`);
    }
});


//Update Existing Customer
route.put('/:id', async(req, res) => {
    const reqBody = req.body;
    const {error} = validate(reqBody);
    if(error){
        res.status(400).send(`Validation Error: ${error.details[0].message}`);
        return;
    }
    const result = await Customer.findByIdAndUpdate({_id:req.params.id},{
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, {new:true});
    if(!result){
        res.status(400).send("No matching customer Found");
        return;
    }
    res.status(200).send(result);
});

//Delete 
route.delete('/:id', async(req, res) => {
    const result = await Customer.findByIdAndRemove({_id:req.params.id});
    if(!result){
        res.status(400).send("No matching customer Found");
        return;
    }
    res.status(200).send(result);
});

module.exports = route;