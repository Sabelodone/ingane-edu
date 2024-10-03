import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjusted path for AuthContext import
import { Container, Form, Button } from 'react-bootstrap';
import './SignIn.css'; // Import your CSS file for styles

function SignIn() {
  const { signIn } = useAuth(); // Accessing signIn function from AuthContext
  const navigate = useNavigate();

  // State hooks for managing email, password, error message, and remember me option
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any previous error message

    try {
      await signIn(email, password); // Attempt to sign in with provided credentials
      navigate('/features'); // Redirect to features page after sign-in
    } catch (error) {
      console.error('Sign-in failed:', error); // Log the error for debugging
      setError('Oops! Something went wrong. Please check your details and try again.'); // Set error message
    }
  };

  return (
    <Container className="container">
      <h2 className="title">👋 Welcome Back!</h2>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              required
              className="input-field"
            />
          </Form.Group>
        </div>

        <div className="input-group">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              required
              className="input-field"
            />
          </Form.Group>
        </div>

        <Form.Group controlId="formBasicRememberMe">
          <Form.Check
            type="checkbox"
            label="Remember Me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)} // Update remember me state on checkbox change
            className="remember-me-checkbox"
          />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>} {/* Display error message if it exists */}

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>

      <div className="links">
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          Don't have an account? <a href="/signup">Sign Up Here</a>
        </p>
      </div>
    </Container>
  );
}

export default SignIn;
