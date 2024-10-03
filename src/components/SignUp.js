import React, { useState } from 'react';
import './SignUp.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setErrorMessage('All fields are required');
        } else {
            setErrorMessage('');
            setSuccessMessage('Sign up successful!');
            // Add sign-up logic here
        }
    };

    return (
        <Container className="mt-5 position-relative">
            <div className="shape-1"></div>
            <div className="shape-2"></div>
            <div className="heart"></div>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <div className="signup-container bg-light p-4 rounded shadow">
                        <h2 className="signup-title text-center text-purple">Sign Up</h2>
                        <Form className="signup-form" onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field"
                                />
                            </Form.Group>
                            <Form.Group controlId="termsCheckbox" className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="I agree to the terms and conditions"
                                    className="terms-checkbox"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="signup-button w-100">
                                Sign Up
                            </Button>
                        </Form>
                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                        {successMessage && <p className="success-message text-success">{successMessage}</p>}
                        <div className="links mt-3">
                            <span>Already have an account? 
                                <Button variant="link" onClick={() => navigate('/signin')}>Sign In</Button>
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
