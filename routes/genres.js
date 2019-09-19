const express = require('express');
const route = express.Router();
const {Genre, validate} = require('../models/genres');

route.get('/', async (req, res) => {
    const result = await Genre.find();
    res.status(200).send(result);
});

route.get('/:id', async (req, res) => {
    const result = await Genre.findById(req.params.id).select({'name':1});
    if(!result){
        res.status(200).send("No data Exists!!");
    }
    res.status(200).send(result);
});

route.post('/', async(req,res) => {
    const genreName = req.body;
    const valResult = validate(genreName);
    if(valResult.error){
        res.status(400).send(valResult.error.details[0].message);
        return;
    }
    const genre = new Genre({
        name: genreName.name
    })
    const result = await genre.save();
    res.status(200).send(result); 
})

route.put('/:id', async(req, res) => {
    const genreId = await Genre.findById(req.params.id);
    if(!genreId) {
        res.status(400).send("No Genre exists !!");
        return;
    }
    const valResult = validate(req.body);
    if(valResult.error){
        res.status(400).send(valResult.error.details[0].message);
        return;
    }
    genreId.name = req.body.name;
    const finalResult = await genreId.save();
    res.status(200).send(finalResult);
})

route.delete('/:id',async(req, res) => {
    const result = await Genre.deleteOne({_id:req.params.id});
    res.status(200).send("Deleted");
});

function checkGenreExist(id){
    return genres.find(genre => {
        return genre.id === parseInt(id)
    });
}



module.exports = route;