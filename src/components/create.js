// Importing necessary React hooks and Axios for making HTTP requests
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Functional component for creating a new book
function Create() {
    // State variables to store form input values
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');

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
            description: description,
            stock: stock
        };

        axios.post('http://localhost:4000/api/scooter/', scooter)
            .then((res) => {
                alert("Scooter added successfully!");
                // Navigating to the 'read' page after successful update
                navigate('/');
            })
            .catch(
                (error) => {
                    console.log(error)
                });
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <hr></hr>
            <h4 style={{ textAlign: 'center', lineHeight: '1.5' }}>ENTER THE DETAILS OF THE NEW PRODUCT:</h4>
            <hr></hr>
            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* Name */}
                    <label>ADD NAME:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/* Cover */}
                    <label>ADD COVER:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/* Brand */}
                    <label>ADD BRAND:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={brand}
                        onChange={(e) => { setBrand(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/* Price */}
                    <label>ADD PRICE:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/* Price */}
                    <label>ADD QUANTITY:</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        className="form-control"
                        value={stock}
                        onChange={(e) => { setStock(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/* Description */}
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

export default Create;
