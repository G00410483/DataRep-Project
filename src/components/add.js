// Importing necessary React hooks and Axios for making HTTP requests
import { useState } from "react";
import axios from "axios";

// Functional component for creating a new book
function Add() {
    // State variables to store form input values
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // Getting the navigate function 
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a scooter object with form input values
        const scooter = {
            title: title,
            cover: cover,
            brand: brand,
            price: price,
            description: description
        };

        // Making a POST request to the server to save the scooter data
        axios.post('http://localhost:4000/api/scooter/', scooter)
            .then((res) => {
                // Navigating to the 'read' page after successful update
                navigate('/read');
            })
            .catch(/* Handle errors if needed */);
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <hr></hr>
            <h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>ENTER THE DETAILS OF THE NEW PRODUCT:</h4>
            <hr></hr>
            {/* Form for adding a new scooter with event handler for form submission */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ADD NAME:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>ADD COVER:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>ADD BRAND:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={brand}
                        onChange={(e) => { setBrand(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>ADD PRICE:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>ADD DESCRIPTION:</label>
                    <textarea
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}

export default Add;
