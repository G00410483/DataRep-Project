// Importing necessary dependencies from React, axios, and Bootstrap
import { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';

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


  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <div>
          
          <hr></hr>
          <h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>DASHBOARD:</h4>
          <hr></hr>
          {/* Display total scooters card if data is available */}
          {dashboardData.totalScooters && (
            <Card style={{ width: '20rem', margin: '1rem' }}>
              <Card.Body>
                <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>Total Scooters: {dashboardData.totalScooters}</h4></Card.Title>
              </Card.Body>
            </Card>
          )}
          {/* Display total price of all scooters card if data is available */}
          {dashboardData.totalPrice && (
            <Card style={{ width: '20rem', margin: '1rem' }}>
              <Card.Body>
                <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>Total Price: ${dashboardData.totalPrice}</h4></Card.Title>
              </Card.Body>
            </Card>
          )}
          {/* Display total price of all scooters card if data is available */}
          {dashboardData.totalPrice && (
            <Card style={{ width: '20rem', margin: '1rem' }}>
              <Card.Body>
                <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>Average Price: ${dashboardData.avgPrice}</h4></Card.Title>
              </Card.Body>
            </Card>
          )}
          {/* Display most expensive scooter card if data is available */}
          {dashboardData.mostExpensiveScooter && (
            <Card style={{ width: '20rem', margin: '1rem' }}>
              <Card.Body>
                <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>{dashboardData.mostExpensiveScooter.title}</h4></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Most Expensive</Card.Subtitle>
              </Card.Body>
            </Card>
          )}
          {/* Display cheapest scooter card if data is available */}
          {dashboardData.cheapestScooter && (
            <Card style={{ width: '20rem', margin: '1rem' }}>
              <Card.Body>
                <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>{dashboardData.cheapestScooter.title}</h4></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Cheapest</Card.Subtitle>
              </Card.Body>
            </Card>
          )}
        </div>
        {/* Display recently added scooters card if data is available */}
        {dashboardData.recentlyAddedScooters && (
          <Card style={{ width: '20rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>Recently Added Scooters</h4></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Latest Additions</Card.Subtitle>
              <Card.Text>
                {dashboardData.recentlyAddedScooters.map(scooter => (
                  <div key={scooter._id}>{scooter.title}</div>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
      
    </div>
  );
};

export default Dashboard;
