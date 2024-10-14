import React, { useState } from 'react'; 
import './Footer.css'; // Ensure you have this CSS file
import LanguageSelector from './LanguageSelector'; // Import Language Selector
import { useLanguage } from '../LanguageContext'; // Import useLanguage hook
import InfoModal from './Modal'; // Import the InfoModal component

const Footer = () => {
    const { translate } = useLanguage(); // Use translate from context

    // Default translations if translate function is not available
    const defaultTexts = {
        about: 'About Us',
        contact: 'Contact Us',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
    };

    // Safely access translate function with default values
    const texts = {
        about: (translate && typeof translate === 'function' ? translate('about') : defaultTexts.about),
        contact: (translate && typeof translate === 'function' ? translate('contact') : defaultTexts.contact),
        terms: (translate && typeof translate === 'function' ? translate('terms') : defaultTexts.terms),
        privacy: (translate && typeof translate === 'function' ? translate('privacy') : defaultTexts.privacy),
    };

    // State to manage modal visibility and content
    const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', content: '' });

    const openModal = (title, content) => {
        setModalInfo({ isOpen: true, title, content });
    };

    const closeModal = () => {
        setModalInfo({ isOpen: false, title: '', content: '' });
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="shapes">
                    <div className="shape circle" aria-hidden="true"></div>
                    <div className="shape square" aria-hidden="true"></div>
                    <div className="shape triangle" aria-hidden="true"></div>
                </div>
                <div className="animal-icons" aria-hidden="true">
                    <span role="img" aria-label="cat">🐱</span>
                    <span role="img" aria-label="dog">🐶</span>
                    <span role="img" aria-label="rabbit">🐰</span>
                    <span role="img" aria-label="tiger">🐯</span>
                </div>
                <LanguageSelector /> {/* Add Language Selector here */}

                <h2 className="business-name">TechArtistry Design</h2>
                <div className="footer-links">
                    <button className="btn btn-link" onClick={() => openModal(texts.about, 
                        "At TechArtistry Design, we are committed to providing innovative and creative design solutions to help your business succeed. Our team of experts specializes in web design, graphic design, and branding, ensuring that your vision comes to life.")}
                    >{texts.about}</button>

                    <button className="btn btn-link" onClick={() => openModal(texts.contact, 
                        "For inquiries or support, please reach out to us at contact@techartistrydesign.com or call us at (074) 642-2396. We look forward to hearing from you!")}
                    >{texts.contact}</button>

                    <button className="btn btn-link" onClick={() => openModal(texts.terms, 
                        "By using our services, you agree to comply with our terms of service. This includes respecting our intellectual property and understanding our service limitations.")}
                    >{texts.terms}</button>

                    <button className="btn btn-link" onClick={() => openModal(texts.privacy, 
                        "Your privacy is very important to us. We are committed to protecting your personal information and using it responsibly in accordance with our privacy policy.")}
                    >{texts.privacy}</button>
                </div>
                <div className="contact-info">
                    <p>Email: <a href="mailto:contact@techartistrydesign.com">contact@techartistrydesign.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">(074) 642-2396</a></p>
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

            {/* Modal for displaying content */}
            <InfoModal 
                isOpen={modalInfo.isOpen} 
                onRequestClose={closeModal} 
                title={modalInfo.title} 
                content={modalInfo.content} 
            />
        </footer>
    );
};

export default Footer;
