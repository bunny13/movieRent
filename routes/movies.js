const {Movie, validate} = require('../models/movies');
const express = require('express');
const route = express.Router();
const {Genre} = require('../models/genres');

route.get('/', async(req, res) => {
    const allMovie = await Movie.find();
    if(!allMovie){
        res.status(200).send("No Movies ");
        return;
    }
    res.status(200).send(allMovie);
});

route.post('/', async(req, res) => {
    try{
        const genreId = req.body.genreId;
        const {error} = validate(req.body);
        if(error){
            res.status(500).send(error.details[0].message);
            return;
        }
        if(!genreId.match(/^[0-9a-fA-F]{24}$/)){
           throw new Error('Invalid Genre Id!!');
        }
        const genre = await Genre.findById(genreId);
        if(!genre){
            res.status(500).send("No Genre exist with Id!!");
            return;
        }
        const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })
        const result = await movie.save();
        res.status(200).send(result);
    }
    catch(err){
        console.log(`Error occured at :${err}`);
        res.status(500).send(err);
    }
    
});

route.get('/:id', async(req, res) => {
    try{
        const movieId = req.params.id;
        if(!movieId.match(/^[0-9a-fA-F]{24}$/)){
           throw new Error('Invalid Movie Id!!');
        }
        const movie = await Movie.findById(movieId);
        if(!movie){
            res.status(500).send("No Movie exist with Id!!");
            return;
        }
        res.status(200).send(movie);
    }
    catch(err){
        console.log(`Error occured at :${err}`);
        res.status(500).send(err);
    }
    
});


route.put('/:id', async(req, res) => {
    try{
        const movieId = req.params.id;
        const {error} = validate(req.body);
        if(error){
            res.status(500).send(error.details[0].message);
            return;
        }
        if(!(checkValidId(movieId) || checkValidId(req.body.genreId))){
           throw new Error('Invalid Id!!');
        }
        //Find Genre First with ID
        const genreResult = await Genre.findById(req.body.genreId);
        if(!genreResult){
            res.status(500).send("No Genre Exist!!");
            return;
        }
        const movie = await Movie.findByIdAndUpdate({_id: movieId},{
            $set:{
                title: req.body.title,
                genre: {
                    _id: genreResult._id,
                    name: genreResult.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            }
        },{new: true});
        res.status(200).send(movie);
    }
    catch(err){
        console.log(`Error occured at :${err}`);
        res.status(500).send(err);
    }
    
});

route.delete('/:id', async(req, res) => {
    try{
        const movieId = req.params.id;
        const {error} = validate(req.body);
        if(error){
            res.status(500).send(error.details[0].message);
            return;
        }
        if(!checkValidId(movieId)){
           throw new Error('Invalid Id!!');
        }
        const movie = await Movie.findByIdAndRemove(movieId);
        res.status(200).send(movie);
    }
    catch(err){
        console.log(`Error occured at :${err}`);
        res.status(500).send(err);
    }
    
});


const checkValidId = (id) => {
    if(!id.match(/^[A-Za-z0-9]{24}$/g)){
        return false
    }
    return true;
}

module.exports = route;