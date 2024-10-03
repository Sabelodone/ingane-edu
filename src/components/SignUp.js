import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Update based on your context
import { Container, Form, Button } from 'react-bootstrap';
import './SignUp.css';

function SignUp() {
    const { signUp } = useUser(); // Updated to use UserContext
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Email validation function
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for validating email
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true); // Start loading

        // Validation checks
        if (!fullName.trim()) {
            setError('Full Name is required.');
            setLoading(false); // Reset loading state
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (!termsAccepted) {
            setError('You must accept the terms and conditions.');
            setLoading(false);
            return;
        }

        // Attempt to sign up the user
        try {
            await signUp(email, password);
            setSuccessMessage('Registration successful! Redirecting to Sign In...');
            setTimeout(() => navigate('/signin'), 2000);
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <Container className="sign-up-container">
            <h2 className="title">✨ Create Your Account!</h2>
            <Form onSubmit={handleSubmit} className="animated-form">
                <Form.Group controlId="formBasicFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="input-field"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </Form.Group>

                <Form.Group controlId="formTerms">
                    <Form.Check
                        type="checkbox"
                        label={
                            <>
                                I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                            </>
                        }
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        required
                        className="terms-checkbox"
                    />
                </Form.Group>

                {error && <p className="text-danger error-message">{error}</p>}
                {successMessage && <p className="text-success success-message">{successMessage}</p>}

                <Button variant="primary" type="submit" className="animated-button" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </Form>

            <div className="links">
                <p>
                    Already have an account? <a href="/signin">Sign In Here</a>
                </p>
            </div>
        </Container>
    );
}

export default SignUp;
