// Importing necessary React hooks and Axios for making HTTP requests
import { useState } from "react";
import axios from "axios";

// Functional component for creating a new book
function Create() {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const scooter = {
            title: title,
            cover: cover,
            brand: brand,
            price: price,
            description: description
        };

        axios.post('http://localhost:4000/api/scooter/', scooter)
            .then(/* Handle success if needed */)
            .catch(/* Handle errors if needed */);
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <hr></hr>
            <h4 style={{ textAlign: 'center', lineHeight: '1.5'  }}>ENTER THE DETAILS OF THE NEW PRODUCT:</h4>
            <hr></hr>
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

export default Create;
