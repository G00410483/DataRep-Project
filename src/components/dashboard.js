import { useEffect, useState } from "react";
import axios from "axios";

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
    
    <div>
      <hr></hr>
      <h4 style={{ textAlign: 'center', lineHeight: '1.5'  }}>DASHBOARD</h4>
      <hr></hr>
      <p>Total Scooters: {dashboardData.totalScooters}</p>
      <p>Average Price: {dashboardData.averagePrice}</p>
      <h3>Recently Added Scooters:</h3>
      <ul>
        {dashboardData.recentlyAddedScooters && dashboardData.recentlyAddedScooters.map((scooter) => (
          <li key={scooter._id}>{scooter.title}{scooter.cover}</li>
        ))}
      </ul>
    </div> 
  );
};

export default Dashboard;
