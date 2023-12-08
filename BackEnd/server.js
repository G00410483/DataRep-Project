// Importing necessary modules and packages
const express = require('express'); // Importing Express framework
const app = express(); // Creating an instance of Express
const port = 4000; // Setting the port for the server
const cors = require('cors'); // Importing CORS for cross-origin resource sharing

// Applying CORS middleware to handle cross-origin requests
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configuring body-parser middleware for handling JSON and URL-encoded data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to MongoDB using Mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

// Async function to connect to MongoDB
async function main() {
  // Connecting to the MongoDB database using the provided URI
  await mongoose.connect('mongodb+srv://dvlasic000:admin@cluster0.xaeynea.mongodb.net/?retryWrites=true&w=majority');
}

// This code defines a Mongoose schedma for a scooter in a MongoDB database
const scooterSchema = new mongoose.Schema({
  title: String,
  cover: String,
  brand: String,
  price: String,
  description: String
});

// Import the mongoose library to interact with MongoDB
const scooterModel = mongoose.model('ScooterModel', scooterSchema);

// Define a route to handle DELETE requests for a specific scooter by ID
app.delete('/api/scooter/:id', async (req, res) => {
  // Log the request ID to the console
  console.log("Delete: " + req.params.id)
  // Use mongoose's findByIdAndDelete to find and delete the scooter by ID
  let scooter = await scooterModel.findByIdAndDelete(req.params.id);
  // Send the deleted scooter as a response
  res.send(scooter);
});

// Define a route to handle PUT requests to update a specific scooter by ID
app.put('/api/scooter/:id', async (req, res) => {
  // Log the request ID to the console
  console.log("Update: " + req.params.id);
  // Use mongoose's findByIdAndUpdate to find and update the scooter by ID with the request body
  let scooter = await scooterModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  // Send the updated scooter as a response
  res.send(scooter);
});

// Define a route to handle POST requests to create a new scooter
app.post('/api/scooter', (req, res) => {
  // Log the request body to the console
  console.log(req.body);

  // Use mongoose's create method to insert a new scooter into the database
  scooterModel.create({
    title: req.body.title,
    cover: req.body.cover,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description
  })
     // Send a success message if the scooter is created
    .then(() => { res.send("NEW SCOOTER CREATED") })
    // Send an error message if the scooter creation fails
    .catch(() => { res.send("SCOOTER NOT CREATED") });
});

// Route for retrieving dashboard information
app.get('/api/dashboard', async (req, res) => {
  try {
    // Total count of scooters
    const totalScooters = await scooterModel.countDocuments({});
    // Most expensive scooter
    const mostExpensiveScooter = await scooterModel.findOne().sort({ price: 1 });
    // Cheapest scooter
    const cheapestScooter = await scooterModel.findOne().sort({ price: -1 });
    // Recently added scooters
    const recentlyAddedScooters = await scooterModel.find({}).sort({ _id: -1 }).limit(2);

    // Respond with the collected dashboard information
    res.json({
      totalScooters,
      mostExpensiveScooter,
      recentlyAddedScooters,
      cheapestScooter
    });
  } catch (error) {
    // Log and respond with an error if an exception occurs
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for retrieving all scooters
app.get('/api/scooters', async (req, res) => {
  // Retrieve all scooters from the database
  let scooters = await scooterModel.find({});
  // Respond with the list of scooters
  res.json(scooters);
});

// Route for retrieving a specific scooter by its identifier
app.get('/api/scooter/:identifier', async (req, res) => {
  // Log the identifier parameter from the request
  console.log(req.params.identifier);

   // Retrieve the scooter with the specified identifier from the database
  let scooter = await scooterModel.findById(req.params.identifier);
  // Respond with the retrieved scooter
  res.send(scooter);
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
