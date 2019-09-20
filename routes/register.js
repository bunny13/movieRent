const _ = require('lodash');
const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/register');

route.post("/", async(req, res) => {
    try{
        const {error} = validate(req.body);
        if(error){
            res.status(500).send(`Validation Error: ${error.details[0].message}`);
            return;
        }

        //Check if User already exist
        const checkUser = await User.findOne({email:req.body.email});
        if(checkUser){
            res.status(400).send("Email Already Registed!!");
            return;
        }
        /*const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });*/
        const user = new User(_.pick(req.body,["name","email","password"]));
        const salt = await bcrypt.genSalt(); 
        user.password = await bcrypt.hash(user.password, salt);
        const result = await user.save();
        res.status(200).send(_.pick(result,["_id","name","email"]));
    }
    catch(ex){
        res.status(500).send(ex.errmsg);
    }
})

route.get("/", async(req, res) => {
    try{
        const {error} = validate(req.body);
        if(error){
            res.status(500).send(`Validation Error: ${error.details[0].message}`);
            return;
        }
        const checkUser = await User.findOne({email:req.body.email});
        if(!checkUser){
            res.status(400).send("No User Exist!!");
            return;
        }
        const match = await bcrypt.compare(req.body.password, checkUser.password);
        if(match){
            res.status(200).send("User Exist!!");
            return;
        }else{
            res.status(400).send("Invalid Password!!");
            return;
        }
    }catch(ex){
        res.status(500).send(ex.message);
    }
});

module.exports = route;