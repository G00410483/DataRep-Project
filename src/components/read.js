// Importing necessary dependencies from the 'react' library and 'axios'
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';

// Importing the 'Scooters' component from a local file
import Scooters from "./scooters";

// Creating the 'Display' component
function Read() {

    // Using the 'useState' hook to create a state variable 'data' with an empty array as its initial value
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Using the 'useEffect' hook to make an HTTP GET request when the component mounts
    useEffect(
        () => {
            // Making an HTTP GET request
            axios.get('http://localhost:4000/api/scooters')
                // If the request is successful, update the 'data' state with the response data
                .then(
                    (response) => {
                        setData(response.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )

        }, [] //THe empty dependency array ensures that the effect runs only once when the component mounts
    );

    // Declaring a function 'ReloadData' that makes another HTTP GET request to update the 'data' state
    const ReloadData = (e) => {
        axios.get('http://localhost:4000/api/scooters')
            .then(
                (response) => {
                    setData(response.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }
    const handleSearch = () => {
        // Make an HTTP GET request with the search term
        axios.get(`http://localhost:4000/api/scooters?search=${searchTerm}`)
            .then((response) => {
                // Update the 'data' state with the filtered scooters
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div>
            <hr></hr>
            <h2>ALL PRODUCTS</h2>
            <br></br>
            <div>
                {/* Search input field */}
                <Form>
                    <Form.Group 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="mb-3 d-flex justify-content-center align-items-center"
                        controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="Search"  style={{ width: '200px' }}/>
                    </Form.Group>
                </Form>
                {/* Search button */}
                <button onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>
            <hr></hr>
            {/* Rendering the 'Scooters' component and passing 'data' and 'ReloadData' function as props */}
            <Scooters myScooters={data} Reload={ReloadData}></Scooters>
        </div>
    );
}



export default Read;