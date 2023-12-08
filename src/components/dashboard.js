import { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/dashboard')
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
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
          {dashboardData.totalScooters && (
            <Card style={{ width: '20rem', margin: '1rem' }}>
              <Card.Body>
                <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>Total Scooters: {dashboardData.totalScooters}</h4></Card.Title>
              </Card.Body>
            </Card>
          )}
          {dashboardData.mostExpensiveScooter && (
            <Card style={{ width: '20rem', margin: '1rem' }}>
              <Card.Body>
                <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>{dashboardData.mostExpensiveScooter.title}</h4></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Most Expensive</Card.Subtitle>
              </Card.Body>
            </Card>
          )}
          {dashboardData.cheapestScooter && (
            <Card style={{ width: '20rem', margin: '1rem' }}>
              <Card.Body>
                <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>{dashboardData.cheapestScooter.title}</h4></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Cheapest</Card.Subtitle>
              </Card.Body>
            </Card>
          )}
        </div>
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
