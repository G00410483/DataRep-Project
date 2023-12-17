import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import carouselImages from './carouselImages'; // Import the image URLs


function Content() {
    return (
        <div>
            <br></br>
            <hr></hr>
            <div className="d-flex justify-content-center align-items-center">
                {/* Define a Carousel component with a fixed width and height */}
                <Carousel style={{ width: '32rem', height: '300px' }}>
                    {/* Map through the carouselImages array to create individual carousel items */}
                    {carouselImages.map((imageUrl, index) => (
                        <Carousel.Item key={index}>
                            {/* Display an image with the following properties */}
                            <img
                                className="d-block w-100"
                                src={imageUrl}
                                alt={`Slide ${index + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <br></br>
            <hr></hr>
            <header>
                <h1>Electric Scooters Store</h1>
                <p>Your one-stop shop for eco-friendly transportation!</p>
            </header>
            <main>
                <section>
                    <h2>Discover the Future of Commuting</h2>
                    <p>Explore our range of electric scooters designed for convenience and sustainability.</p>
                </section>
                <section>
                    <h2>Why Choose Electric Scooters?</h2>
                    <p>Efficient, eco-friendly, and stylish – electric scooters are the perfect solution for modern urban commuting.</p>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 Electric Scooters Store</p>
            </footer>
        </div>
    );
}

export default Content;
