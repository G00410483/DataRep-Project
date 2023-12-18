import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the database when the component mounts
    axios.get("http://localhost:4000/api/orders")

      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleDeleteOrder = (orderId) => {
    // Send a DELETE request to delete the order by ID
    axios.delete(`http://localhost:4000/api/order/${orderId}`)
      .then(() => {
        // Remove the deleted order from the state
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  return (
    <div>
      <hr></hr>
      <h2>LIST OF ORDERS</h2>
      <hr></hr>
      <table className="table">
        <thead>
          <tr>
            <th>ITEM</th>
            <th>NAME</th>
            <th>ADDRESS</th>
            <th>ORDER DATE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.item}</td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>
              <Button
                  className="btn btn-danger"
                  onClick={() => handleDeleteOrder(order._id)}>Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
