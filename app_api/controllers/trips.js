const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

const tripsAddTrip = async(req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const q = await newTrip.save();
        return res.status(201).json(q);
    }
    catch(err) {
        return res.status(400).json(err);
    }
};

const tripsList = async(req, res) => {
    try {
        const q = await Model.find({}).exec();
        
        if (!q || q.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }
        else {
            return res.status(200).json(q);
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
};

const tripsFindByCode = async(req, res) => {
    try {
        const q = await Model.findOne({'code': req.params.tripCode}).exec();  // Use findOne, not find
        
        if (!q) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        else {
            return res.status(200).json(q);
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
// Uncomment for debugging
console.log(req.params);
console.log(req.body);
const q = await Model
.findOneAndUpdate(
{ 'code' : req.params.tripCode },
{
code: req.body.code,
name: req.body.name,
length: req.body.length,
start: req.body.start,
resort: req.body.resort,
perPerson: req.body.perPerson,
image: req.body.image,
description: req.body.description
}
)
.exec();
if(!q)
{ // Database returned no data
return res
.status(400)
.json(err);
} else { // Return resulting updated trip
return res
.status(201)
.json(q);
}
// Uncomment the following line to show results of
operation
// on the console
// console.log(q);
};

module.exports = {tripsList, tripsFindByCode, tripsAddTrip, tripsUpdateTrip};