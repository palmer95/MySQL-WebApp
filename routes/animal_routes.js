/**
 * Created by JT on 12/9/2016.
 */
var express = require('express');
var router = express.Router();
var animals_dal = require('../model/animal_dal');


// View All animalss
router.get('/all', function(req, res) {
    animals_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('animal/animalViewAll', { 'result':result });
        }
    });

});

// View the animals for the given id
router.get('/', function(req, res){
    if(req.query.animal_id == null) {
        res.send('animal_id is null');
    }
    else {
        animals_dal.getById(req.query.animal_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('animal/animalViewById', {'result': result});
            }
        });
    }
});

// Return the add a new animals form
router.get('/add', function(req, res){
    res.render('animal/animalAdd');
});

// insert a animals record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.typeOfAnimal == null) {
        res.send('an animal must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        animals_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/animal/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.animal_id == null) {
        res.send('A animals id is required');
    }
    else {
        animals_dal.edit(req.query.animal_id, function(err, result){
            console.log(result);
            //need to change this line
            res.render('animal/animalUpdate', {animal: result});//, address: result[1]});
        });
    }

});

router.get('/update', function(req, res) {
    animals_dal.update(req.query, function(err, result){
        res.redirect(302, '/animal/all');
    });
});


// Delete a address for the given address_id
router.get('/delete', function(req, res){
    if(req.query.animal_id == null) {
        res.send('animal_id is null');
    }
    else {
        animals_dal.delete(req.query.animal_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/animal/all');
            }
        });
    }
});


module.exports = router;