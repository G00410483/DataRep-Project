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
        <Card style={{ width: '25rem', margin: '1rem' }}>
          <Card.Body>
            <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>DASHBOARD</h4></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              Total Scooters: {dashboardData.totalScooters}
            </Card.Text>
          </Card.Body>
        </Card>
        {dashboardData.mostExpensiveScooter && (
          <Card style={{ width: '25rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>{dashboardData.mostExpensiveScooter.title}</h4></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Most Expensive</Card.Subtitle>
            </Card.Body>
          </Card>
        )}
        {dashboardData.cheapestScooter && (
          <Card style={{ width: '25rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title><h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>{dashboardData.cheapestScooter.title}</h4></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Cheapest</Card.Subtitle>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
