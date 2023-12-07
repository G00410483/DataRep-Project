import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit() {
    let { id } = useParams();

    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    useEffect(
        () => {

            axios.get('http://localhost:4000/api/scooter/' + id)
                .then((response) => {
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
        }, [id]
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const scooter = {
            title: title,
            cover: cover,
            brand: brand,
            price: price,
            description: description
        }

        axios.put('http://localhost:4000/api/scooter/' + id, scooter)
            .then((res) => {
                navigate('/read');
            })
            .catch(
                (error) => {
                    console.log(error)
                });
    }
    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <hr></hr>
            <h4 style={{ textAlign: 'center', lineHeight: '1.5'  }}>EDIT THE DETAILS OF THE PRODUCT:</h4>
            <hr></hr>
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
                <div style={{ textAlign: 'center' }}>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}