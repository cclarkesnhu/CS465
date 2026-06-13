// Bring in the DB conneciton and the Trip scheme
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./app_server/data/trips.json','utf8'))

// delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB conneciton and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});