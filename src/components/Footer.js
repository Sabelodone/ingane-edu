// Footer.js
import React from 'react'; 
import './Footer.css'; // Ensure you have this CSS file
import LanguageSelector from './LanguageSelector'; // Import Language Selector
import { useLanguage } from '../LanguageContext'; // Import useLanguage hook


const Footer = () => {
    const { translate } = useLanguage(); // Use translate from context

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="shapes">
                    <div className="shape circle"></div>
                    <div className="shape square"></div>
                    <div className="shape triangle"></div>
                </div>
                <div className="animal-icons">
                    <span role="img" aria-label="cat">🐱</span>
                    <span role="img" aria-label="dog">🐶</span>
                    <span role="img" aria-label="rabbit">🐰</span>
                    <span role="img" aria-label="tiger">🐯</span>
                </div>
                <LanguageSelector /> {/* Add Language Selector here */}

                <h2 className="business-name">TechArtistry Design</h2>
                <div className="footer-links">
                    <a href="#about">{translate('about')}</a>
                    <a href="#contact">{translate('contact')}</a>
                    <a href="#terms">{translate('terms')}</a>
                    <a href="#privacy">{translate('privacy')}</a>
                </div>
                <div className="contact-info">
                    <p>Email: contact@techartistrydesign.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Address: 123 Creative Lane, Imagination City, Funland</p>
                </div>
                <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 TechArtistry Design. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
