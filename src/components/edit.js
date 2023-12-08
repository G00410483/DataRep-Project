// Importing necessary modules from external libraries
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// React functional component for editing product details
export default function Edit() {
    // Extracting the 'id' parameter from the URL using react-router-dom's useParams hook
    let { id } = useParams();

    // Initializing state variables using the useState hook for managing form input values
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

     // Getting the navigate function 
    const navigate = useNavigate();

     // useEffect hook to fetch the existing product details when the component mounts
    useEffect(
        () => {
            // Making an asynchronous GET request to the server to fetch product details based on the provided 'id'
            axios.get('http://localhost:4000/api/scooter/' + id)
                .then((response) => {
                     // Updating state variables with the fetched data
                    setTitle(response.data.title);
                    setCover(response.data.cover);
                    setBrand(response.data.brand);
                    setPrice(response.data.price);
                    setDescription(response.data.description);
                })
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
        }, [id] // Dependency array ensures the effect runs only when 'id' changes
    );
    
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Creating an object with the updated product details
        const scooter = {
            title: title,
            cover: cover,
            brand: brand,
            price: price,
            description: description
        }

        // Making an asynchronous PUT request to update the product details on the server
        axios.put('http://localhost:4000/api/scooter/' + id, scooter)
            .then((res) => {
                // Navigating to the 'read' page after successful update
                navigate('/read');
            })
            .catch(
                (error) => {
                    console.log(error)
                });
    }
    // Rendering the edit form with input fields and a submit button
    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <hr></hr>
            <h4 style={{ textAlign: 'center', lineHeight: '1.5'  }}>EDIT THE DETAILS OF THE PRODUCT:</h4>
            <hr></hr>
            // Functional component for displaying a scooter item
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>EDIT NAME:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>EDIT COVER:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>EDIT BRAND:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={brand}
                        onChange={(e) => { setBrand(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>EDIT PRICE:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>EDIT DESCRIPTION:</label>
                    <textarea
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                {/* Submit button to save the changes */}
                <div style={{ textAlign: 'center' }}>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}