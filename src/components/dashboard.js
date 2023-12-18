// Importing necessary dependencies from React, axios, and Bootstrap
import { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Functional component for the Dashboard
const Dashboard = () => {
  // State to store dashboard data
  const [dashboardData, setDashboardData] = useState({});

  // useEffect hook to fetch data from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/dashboard')
      .then((response) => {
        // Update the state with the fetched data
        setDashboardData(response.data);
      })
      .catch((error) => {
        // Log any errors that occur during the data fetch
        console.log(error);
      });
  }, []);

  {/* Display dashboard */}
  return (
    <div className="container mt-4">
      <hr></hr>
      <h4 className="text-center mb-4">DASHBOARD</h4>
      <hr></hr>
      <Row className="justify-content-center">
        {dashboardData.totalQuantity && (
          <Col md={4} classNasme="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Total Scooters Available</Card.Title>
                <Card.Text className="text-center">{dashboardData.totalQuantity} scooters- {dashboardData.totalModels} TYPES</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
        {dashboardData.totalPrice && (
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Total Price of all Available Scooters</Card.Title>
                <Card.Text className="text-center">${dashboardData.totalPrice}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
        {dashboardData.avgPrice && (
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Average Price</Card.Title>
                <Card.Text className="text-center">${dashboardData.avgPrice}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
        {dashboardData.mostExpensiveScooter && (
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Most Expensive</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">{dashboardData.mostExpensiveScooter.title}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        )}
        {dashboardData.cheapestScooter && (
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Cheapest</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">{dashboardData.cheapestScooter.title}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        )}
        {dashboardData.recentlyAddedScooters && (
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Recently Added Scooters</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">Latest Additions</Card.Subtitle>
                <Card.Text>
                  {dashboardData.recentlyAddedScooters.map(scooter => (
                    <div key={scooter._id}>{scooter.title}</div>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
