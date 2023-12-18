import { useState, useEffect } from "react";
import axios from "axios";

function Order() {
  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [scooters, setScooters] = useState([]);
  const [selectedScooter, setSelectedScooter] = useState(null);

  useEffect(() => {
    // Fetch the list of available scooters from your backend when the component mounts
    axios.get("http://localhost:4000/api/scooters")
      .then((response) => {
        setScooters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scooters:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedScooter) {
      alert("Please select a valid scooter.");
      return;
    }

    if (selectedScooter.stock <= 0) {
      alert("Sorry, this scooter is out of stock.");
      return;
    }

    const order = {
      item: selectedScooter.title,
      name: name,
      address: address,
    };

    axios.post("http://localhost:4000/api/order/", order)
      .then(() => {
        alert("Order placed successfully!");
        // You can update the scooter stock in the frontend here if needed
        // For example, setSelectedScooter({ ...selectedScooter, stock: selectedScooter.stock - 1 });
        // This would reduce the stock of the selected scooter by 1 after placing an order.
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const handleScooterSelect = (e) => {
    const selectedScooterId = e.target.value;
    const scooter = scooters.find((s) => s._id === selectedScooterId);
    setSelectedScooter(scooter);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <hr />
      <h4 style={{ textAlign: "center", lineHeight: "1.5" }}>ENTER THE ORDER DETAILS:</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ADD CUSTOMER NAME:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>ADD CUSTOMER ADDRESS:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>SELECT SCOOTER:</label>
          <select
            className="form-control"
            onChange={handleScooterSelect}
          >
            <option value="">Select a scooter</option>
            {scooters.map((scooter) => (
              <option key={scooter._id} value={scooter._id}>
                {scooter.title} (Stock: {scooter.stock})
              </option>
            ))}
          </select>
        </div>
        <div style={{ textAlign: "center" }}>
          <br />
          <button type="submit" className="btn btn-primary" disabled={!selectedScooter || selectedScooter.stock <= 0}>
            ORDER
          </button>
        </div>
      </form>
    </div>
  );
}

export default Order;
