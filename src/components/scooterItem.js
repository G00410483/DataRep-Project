// Importing necessary components and libraries
import Card from 'react-bootstrap/Card'; // Importing the Card component from react-bootstrap
import { Link } from 'react-router-dom'; // Importing the Link component from react-router-dom for navigation
import Button from 'react-bootstrap/Button'; // Importing the Button component from react-bootstrap
import axios from 'axios'; // Importing Axios for making HTTP requests
import Carousel from 'react-bootstrap/Carousel';

// Functional component for displaying a scooter item
function ScooterItem(props) {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-md-6">
                    <Card style={{ width: '18rem' }}>
                        {/* Title */}
                        <Card.Header>{props.myScooter.title}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <Carousel data-bs-theme="dark">
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={props.myScooter.cover}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* Cover */}
                                        <img
                                            className="d-block w-100"
                                            src={props.myScooter.cover}  // Replace with the second image source
                                            alt="Second slide"
                                            style={{ width: '15rem' }}
                                        />
                                    </Carousel.Item>
                                </Carousel>
                                <footer>
                                    {/* Price */}
                                    ${props.myScooter.price}
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            {/* Brand */}
                            <Card.Title>{props.myScooter.brand}</Card.Title>
                            <hr></hr>
                            {/* Description */}
                            <Card.Subtitle style={{ fontSize: 'small', lineHeight: '1.5' }} className="mb-2 text-muted">
                                {props.myScooter.description}
                            </Card.Subtitle>
                            <hr></hr>
                            <Card.Subtitle style={{ fontSize: 'small', lineHeight: '1.5' }} className="mb-2 text-muted">
                                Number of Items in stock: {props.myScooter.stock}
                            </Card.Subtitle>
                            <hr></hr>
                            {/* Edit and delete buttons */}
                            <Link to={'/edit/' + props.myScooter._id} className='btn btn-primary'>Edit</Link>
                            {/* Opens edit page */}
                            <Button variant='danger' onClick={(e) => {
                                axios.delete('http://localhost:4000/api/scooter/' + props.myScooter._id)
                                    .then((res) => {
                                        let reload = props.reload();
                                    })
                                    .catch();
                                {/* Removes item from the database */ }
                            }}>Delete</Button>
                        </Card.Body>
                       
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ScooterItem;
