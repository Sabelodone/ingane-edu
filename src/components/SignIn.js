import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Email and password are required');
        } else {
            setErrorMessage('');
            // Add sign-in logic here
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <div className="signin-container">
                        <h2 className="signin-title">Sign In</h2>
                        <div className="shapes-container">
                            {/* Add shapes or alphabets here */}
                            <div className="circle shape"></div>
                            <div className="star shape"></div>
                            <div className="triangle shape"></div>
                            <div className="letter-a">A</div>
                            <div className="letter-b">B</div>
                        </div>
                        <Form className="signin-form" onSubmit={handleSubmit}>
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
                            <Form.Group controlId="formBasicCheckbox" className="mb-3">
                                <Form.Check 
                                    type="checkbox"
                                    label="Remember me"
                                    className="remember-me-checkbox"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="signin-button w-100">
                                Sign In
                            </Button>
                        </Form>
                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                        <div className="links mt-3">
                            <Button variant="link" onClick={() => alert('Forgot password logic here')}>Forgot password?</Button><br />
                            <span>Don't have an account? 
                                <Button variant="link" onClick={() => navigate('/signup')}>Sign Up</Button>
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
