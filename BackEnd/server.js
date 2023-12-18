// Importing necessary modules and packages
const express = require('express'); // Importing Express framework
const app = express(); // Creating an instance of Express
const port = 4000; // Setting the port for the server
const cors = require('cors'); // Importing CORS for cross-origin resource sharing

// Applying CORS middleware to handle cross-origin requests
// Enable CORS middleware using the cors() function
app.use(cors());
// Define a custom middleware function that sets CORS headers for incoming HTTP requests
app.use(function (req, res, next) {
  // Allow requests from any origin by setting the "Access-Control-Allow-Origin" header to "*".
  res.header("Access-Control-Allow-Origin", "*");
  // Define the allowed HTTP methods that can be used in cross-origin requests.
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // Specify the allowed headers in the incoming requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Call the next middleware or route handler to continue processing the request.
  next();
});

// Configuring body-parser middleware for handling JSON and URL-encoded data
const bodyParser = require("body-parser");
// Configure Express to use the body-parser middleware for parsing request bodies.
// Parse URL-encoded data and populate the `req.body` object.
app.use(bodyParser.urlencoded({ extended: false }));
// Parse JSON data and populate the `req.body` object.
app.use(bodyParser.json());

// Connecting to MongoDB using Mongoose
const mongoose = require('mongoose');

// Execute the asynchronous function main()
 // If the main function succeeds, this block is executed
main().catch(err => console.log(err));

// Async function to connect to MongoDB
async function main() {
  // Connecting to the MongoDB database using the provided URI
  await mongoose.connect('mongodb+srv://dvlasic000:admin@cluster0.xaeynea.mongodb.net/?retryWrites=true&w=majority');
}

// Schemas

// Define schema for scooters
const scooterSchema = new mongoose.Schema({
  title: String,
  cover: String,
  brand: String,
  price: String,
  description: String,
  stock: String
});

// Define a schema for orders
const orderSchema = new mongoose.Schema({
  item: String,
  name: String,
  address: String,
  price: String,
  orderDate: { type: Date, default: Date.now },
});

// Import the mongoose library to interact with MongoDB
const scooterModel = mongoose.model('ScooterModel', scooterSchema);
const orderModel = mongoose.model('OrderModel', orderSchema);

// SCOOTER ROUTES
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
    // Define the properties and values for the new document
    title: req.body.title,
    cover: req.body.cover,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.description
  })

     // Send a success message if the scooter is created
    .then(() => { res.send("NEW SCOOTER CREATED") })
    // Send an error message if the scooter creation fails
    .catch(() => { res.send("SCOOTER NOT CREATED") });
});

// Route for retrieving dashboard information
app.get('/api/dashboard', async (req, res) => {
  try {
    // Calculate total price and total quantity of all scooters
    const scooterStats = await scooterModel.aggregate([
      {
        $group: {
          // Grouping by null- aggregating all documents together
          _id: null,
          // Calculate price of all documents
          totalPrice: { $sum: { $multiply: [{ $toDouble: "$price" }, { $toInt: "$stock" }] } },
          // Calculate quantity of all documents
          totalQuantity: { $sum: { $toInt: "$stock" } }
        }
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the result
          totalPrice: 1, // Include totalPrice in the result
          totalQuantity: 1 // Include total quantity in result
        }
      }
    ]);

    // Extracting properties from an object
    const { totalPrice, totalQuantity } = scooterStats[0];

    // Total count of scooters
    const totalModels = await scooterModel.countDocuments({});
    // Most expensive scooter
    const mostExpensiveScooter = await scooterModel.findOne().sort({ price: -1 });
    // Cheapest scooter
    const cheapestScooter = await scooterModel.findOne().sort({ price: 1 });
    // Recently added scooters - last 3 scooters added to the database
    const recentlyAddedScooters = await scooterModel.find({}).sort({ _id: -1 }).limit(3);
    // Calculate the average price and round it to two decimal points
    const avgPrice = (totalPrice / totalQuantity).toFixed(2);

    // Respond with the collected dashboard information
    res.json({
      totalModels,
      totalQuantity,
      totalPrice,
      avgPrice,
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

// Route for retrieving all scooters with search functionality
app.get('/api/scooters', async (req, res) => {
  // Retrieve the search query from the request parameters
  const searchTerm = req.query.search;

  // Define the search criteria based on the title field
  // This block of code was taken from following page: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  // Creating a case-insensitive regular expression (new RegExp(searchTerm, 'i'))
  // i - flag that indicates
  // ('? :') - check if searchTerm is truth of false
  const searchCriteria = searchTerm
    ? { title: { $regex: new RegExp(searchTerm, 'i') } }
    : {};

  // Retrieve scooters from the database based on the search criteria
  let scooters = await scooterModel.find(searchCriteria);

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



// ORDER ROUTES 
// Route for retrieving all orders
app.get('/api/orders', async (req, res) => {
  try {
    // Display all orders from database
    const orders = await orderModel.find();

    // Total count of scooters
    const totalOrders = await scooterModel.countDocuments({});

    res.json(
      orders,
      totalOrders
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a route to handle POST requests to create a new order
app.post('/api/order', async (req, res) => {
  const { item, name, address, price } = req.body;

  // Checj uf required information is missing 
  if (!item || !name || !address) {
    // If any of the required information is missing, resopnd with 400 status
    return res.status(400).json({ error: "Missing required information." });
  }

  try {
    // Find a scooter in the database by its title
    const scooter = await scooterModel.findOne({ title: item });

    // Check if scooter with specified title exists
    if (!scooter) {
      // If scooter is not found respond with 404 status
      return res.status(404).json({ error: "Scooter not found." });
    }

    // Check if the scooter is out of stock 
    if (scooter.stock <= 0) {
      // If scooter is out of stocm, respond with 400 status
      return res.status(400).json({ error: "Scooter is out of stock." });
    }

    // Create a new order document with provided properties
    const order = new orderModel({
      item: item,
      name: name,
      address: address,
      price: price
    });

    // Decrease the stock of the scooter by 1
    scooter.stock = String(Number(scooter.stock) - 1);

    // Save the order and update the scooter in the database
    await order.save();
    await scooter.save();

    // Respond with status
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a route to handle DELETE requests for a specific order by ID
app.delete('/api/order/:id', async (req, res) => {
  try {
    // Find and delete the order by ID
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);

    // If order not found respond with status
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Update the scooter's stock (assuming you have a reference to the scooter in the order)
    const scooter = await scooterModel.findOne({ title: deletedOrder.item });
    // If scooter is found
    if (scooter) {
      // Increments stock so it's same like before this order
      scooter.stock = String(Number(scooter.stock) + 1);
      // Save the state of scooter in the database
      await scooter.save();
    }
    res.json(deletedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
