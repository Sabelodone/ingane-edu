import React, { useState, useEffect, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js'; // Import CardElement
import './Izindatshana.css'; // Ensure the casing matches exactly

const stripePromise = loadStripe('your-publishable-stripe-key');

const Izindatshana = () => {
    const [story, setStory] = useState('');
    const [audioPreview, setAudioPreview] = useState('');
    const [audioFull, setAudioFull] = useState('');
    const [paid, setPaid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Create a ref for the card element
    const cardElement = useRef(null);

    // Fetch a new story on component mount
    useEffect(() => {
        fetchStory();
    }, []);

    const fetchStory = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/generate-story');
            setStory(response.data.text);
            setAudioPreview(response.data.audioPreviewUrl);
            setAudioFull(response.data.audioFullUrl);
        } catch (err) {
            setError('Error fetching story');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const { error, paymentIntent } = await stripe.confirmCardPayment('your-client-secret', {
                payment_method: {
                    card: cardElement.current, // Use cardElement.current to access the DOM element
                    billing_details: { name: 'Customer Name' }
                }
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setPaid(true);
            }
        } catch (error) {
            setError('Payment failed');
        }
    };

    return (
        <div>
            <h1>Izindaba Ezimfishane</h1>
            {loading ? (
                <p>Loading story...</p>
            ) : (
                <div className="story-container">
                    <p>{paid ? story : story.slice(0, 100) + '...'}</p>
                    <ReactAudioPlayer src={paid ? audioFull : audioPreview} controls className="react-audio-player" />
                    {!paid && (
                        <>
                            {/* Include card element for Stripe payment */}
                            <div ref={cardElement}>
                                <CardElement /> {/* Render the Stripe Card Element here */}
                            </div>
                            <button onClick={handlePayment}>
                                Pay to unlock full story
                            </button>
                        </>
                    )}
                    {error && <p className="error-message">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default Izindatshana;
