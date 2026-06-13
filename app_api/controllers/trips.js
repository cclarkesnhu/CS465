const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

const tripsList = async(req, res) => {
    try {
        const q = await Model.find({}).exec();
        
        if (!q) {
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
        const q = await Model.find({'code' : req.params.tripCode }).exec();
        
        if (!q) {
            return res.status(404).json({err});
        }
        else {
            return res.status(200).json(q);
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
};

module.exports = {tripsList, tripsFindByCode};