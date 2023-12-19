import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Order() {
  // Define state variables to store form data and scooter information
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [scooters, setScooters] = useState([]);
  const [selectedScooter, setSelectedScooter] = useState(null);

  // Access the navigation object from React Router
  const navigate = useNavigate();

  // Use the useEffect hook to fetch available scooters from the backend on component mount
  useEffect(() => {
    // Fetch the list of available scooters from your backend when the component mounts
    axios.get("http://localhost:4000/api/scooters")
      .then((response) => {
        // Update scooters
        setScooters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scooters:", error);
      });
  }, []);

   // Define a function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate selected scooter and stock availability
    if (!selectedScooter) {
      alert("Please select a valid scooter.");
      return;
    }

    // If the scooter is out of stock
    if (selectedScooter.stock <= 0) {
      alert("Sorry, this scooter is out of stock.");
      return;
    }

    const order = {
      item: selectedScooter.title,
      name: name,
      address: address,
      price: selectedScooter.price
    };

     // Send a POST request to create a new order
    axios.post("http://localhost:4000/api/order/", order)
      .then(() => {
        // Navigate back to the homepage after a successful order placement
        alert("Order placed successfully!");
        navigate('/');
        
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  // Define a function to handle scooter selection
  const handleScooterSelect = (e) => {
    // Extract the selected scooter's ID from the target's value
    const selectedScooterId = e.target.value;

    // Use the find method to search for selected scooter by its ID
    const scooter = scooters.find((s) => s._id === selectedScooterId);
    // Set the selectedScooter state variable to the found scooter object
    setSelectedScooter(scooter);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <hr />
      <h4 style={{ textAlign: "center", lineHeight: "1.5" }}>ENTER THE ORDER DETAILS:</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Adding customer name */}
          <label>ADD CUSTOMER NAME:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          {/* Adding customer address */}
          <label>ADD CUSTOMER ADDRESS:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {/* Selecting the scooter */}
        <div className="form-group">
          <label>SELECT SCOOTER:</label>
          <select
            className="form-control"
            onChange={handleScooterSelect}>
            <option value="">Select a scooter</option>
            {/* Use JavaScript's 'map' function to iterate through the 'scooters' array */}
            {scooters.map((scooter) => (
              // Each scooter object is represented as an 'option' element within curly braces
              // 'key' is a unique identifier for each option element, based on the scooter's '_id' property
              <option key={scooter._id} value={scooter._id}>
                  {/* Display the scooter's title and available stock within parentheses */}
                {scooter.title} (Available: {scooter.stock})
                <p> ${scooter.price}</p>
              </option>
            ))}
          </select>
        </div>
        <div style={{ textAlign: "center" }}>
          <br />
          {/* Create button that is disabled if scooter is not selected or is out of the stock */}
          <button type="submit" 
            className="btn btn-primary" 
            disabled={!selectedScooter || selectedScooter.stock <= 0}>ORDER
          </button>
        </div>
      </form>
    </div>
  );
}

export default Order;
