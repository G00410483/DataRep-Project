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

const scooterSchema = new mongoose.Schema({
  title: String,
  cover: String,
  brand: String,
  price: String,
  description: String
});


const scooterModel = mongoose.model('ScooterModel', scooterSchema);


app.delete('/api/scooter/:id', async (req, res) => {
  console.log("Delete: " + req.params.id)


  let scooter = await scooterModel.findByIdAndDelete(req.params.id);
  res.send(scooter);
})


app.put('/api/scooter/:id', async (req, res) => {
  console.log("Update: " + req.params.id);

  let scooter = await scooterModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(scooter);
})

app.post('/api/scooter', (req, res) => {
  console.log(req.body);

  scooterModel.create({
    title: req.body.title,
    cover: req.body.cover,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description
  })
    .then(() => { res.send("NEW SCOOTER CREATED") })
    .catch(() => { res.send("SCOOTER NOT CREATED") });
})

app.get('/api/dashboard', async (req, res) => {
  try {
    // Total count of scooters
    const totalScooters = await scooterModel.countDocuments({});

    // Recently added scooters with brand "Segway"
    const recentlyAddedScooters = await scooterModel.find({ brand: "Segway" });

    // Calculate average price using aggregation framework
    console.log("Before aggregation pipeline");
    const averagePriceResult = await scooterModel.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: "$price" }
        }
      }
    ]).exec();
    console.log("After aggregation pipeline", averagePriceResult);



    // Extract the average price from the result
    const averagePrice = averagePriceResult.length > 0 ? averagePriceResult[0].averagePrice : 0;
    console.log(averagePrice);
    res.json({ totalScooters, recentlyAddedScooters, averagePrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/api/scooters', async (req, res) => {

  let scooters = await scooterModel.find({});
  res.json(scooters);
})

app.get('/api/scooter/:identifier', async (req, res) => {
  console.log(req.params.identifier);

  let scooter = await scooterModel.findById(req.params.identifier);
  res.send(scooter);
})

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
