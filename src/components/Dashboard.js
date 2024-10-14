import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaFeatherAlt, FaBook, FaBrain, FaComments, FaMusic } from 'react-icons/fa'; // Import necessary icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Dashboard.css'; // Custom CSS for styling


const Dashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    return (
        <Container fluid className="dashboard-container">
            {/* Add a large heading for the dashboard with a heart */}
            <h1 className="text-center mt-4 mb-4">
                Izici Zethu
                <span className="gradient-heart"></span> {/* Add the heart here */}
            </h1>

            <Row className="justify-content-center mt-4 gx-4 gy-4">
            <Col xs={12} sm={6} md={4} lg={3}>
    <Card
        className="luxury-card card-red shadow-lg mb-4 rounded"
        style={{ animation: 'bounceIn 1.5s' }}
        onClick={() => navigate('/izindatshana')} // Navigate to Izindatshana on click
    >
        <Card.Body className="text-center d-flex flex-column align-items-center">
            <FaFeatherAlt className="luxury-icon mb-3" size={60} />
            <h5 className="luxury-title">Izindatshana</h5>
            <p className="luxury-text">Funda izindaba ezimnandi ezizokhuthaza izingane zakho.</p>
        </Card.Body>
    </Card>
</Col>


                <Col xs={12} sm={6} md={4} lg={3}>
                    <Card
                        className="luxury-card card-blue shadow-lg mb-4 rounded"
                        style={{ animation: 'fadeIn 1.5s' }}
                        onClick={() => navigate('/izinsomi')} // Navigate to Izinsomi on click
                    >
                        <Card.Body className="text-center d-flex flex-column align-items-center">
                            <FaBook className="luxury-icon mb-3" size={60} />
                            <h5 className="luxury-title">Izinsomi</h5>
                            <p className="luxury-text">Izinsomi ezikhuluma ngempilo nezingane.</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={4} lg={3}>
                    <Card
                        className="luxury-card card-green shadow-lg mb-4 rounded"
                        style={{ animation: 'zoomIn 1.5s' }}
                        onClick={() => navigate('/ukuphicaphica')} // Navigate to Ukuphicaphica on click
                    >
                        <Card.Body className="text-center d-flex flex-column align-items-center">
                            <FaBrain className="luxury-icon mb-3" size={60} />
                            <h5 className="luxury-title">Ukuphicaphica</h5>
                            <p className="luxury-text">Thola ukuphicaphica okuhle nezifundo ezinzulu.</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={4} lg={3}>
                    <Card
                        className="luxury-card card-pink shadow-lg mb-4 rounded"
                        style={{ animation: 'flipInX 1.5s' }}
                        onClick={() => navigate('/izisho-nezaga')} // Navigate to Izisho/Nezaga on click
                    >
                        <Card.Body className="text-center d-flex flex-column align-items-center">
                            <FaComments className="luxury-icon mb-3" size={60} />
                            <h5 className="luxury-title">Izisho/Nezaga</h5>
                            <p className="luxury-text">Izisho ezinamandla nezaga ezizokhuthaza izingane.</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={4} lg={3}>
                    <Card
                        className="luxury-card card-yellow shadow-lg mb-4 rounded"
                        style={{ animation: 'lightSpeedIn 1.5s' }}
                        onClick={() => navigate('/onkamisa')} // Navigate to Onkamisa on click
                    >
                        <Card.Body className="text-center d-flex flex-column align-items-center">
                            <FaMusic className="luxury-icon mb-3" size={60} />
                            <h5 className="luxury-title">Onkamisa</h5>
                            <p className="luxury-text">Amathiphu nezindlela zokuphila.</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={4} lg={3}>
                    <Card
                        className="luxury-card card-dark-pink shadow-lg mb-4 rounded"
                        style={{ animation: 'rollIn 1.5s' }}
                        onClick={() => navigate('/imisindo')} // Navigate to Imisindo on click
                    >
                        <Card.Body className="text-center d-flex flex-column align-items-center">
                            <FaMusic className="luxury-icon mb-3" size={60} />
                            <h5 className="luxury-title">Imisindo</h5>
                            <p className="luxury-text">Izinsizakusebenza ezithokozisayo.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
