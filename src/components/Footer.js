import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../LanguageContext";
import InfoModal from "./Modal";

const Footer = () => {
  const { translate } = useLanguage();
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: "", content: "" });

  const openModal = (title, content) => {
    setModalInfo({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalInfo({ isOpen: false, title: "", content: "" });
  };

  return (
    <footer className="bg-gradient-to-r from-pink-300 via-teal-300 to-lime-300 text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Language Selector */}
          <div className="text-center">
            <LanguageSelector />
            <h2 className="text-4xl font-bold text-teal-600 mt-4">TechArtistry Design</h2>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">Quick Links</h3>
            <div className="space-y-4">
              <button
                className="text-pink-500 hover:text-teal-600 text-lg font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                onClick={() => openModal(translate("about"), translate("aboutContent"))}
              >
                {translate("about")}
              </button>
              <button
                className="text-pink-500 hover:text-teal-600 text-lg font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                onClick={() => openModal(translate("contact"), translate("contactContent"))}
              >
                {translate("contact")}
              </button>
              <button
                className="text-pink-500 hover:text-teal-600 text-lg font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                onClick={() => openModal(translate("terms"), translate("termsContent"))}
              >
                {translate("terms")}
              </button>
              <button
                className="text-pink-500 hover:text-teal-600 text-lg font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                onClick={() => openModal(translate("privacy"), translate("privacyContent"))}
              >
                {translate("privacy")}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">Contact Info</h3>
            <p className="text-lg text-purple-600">
              Email:{" "}
              <a href="mailto:contact@techartistrydesign.com" className="text-teal-500 hover:underline font-semibold">
                contact@techartistrydesign.com
              </a>
            </p>
            <p className="text-lg text-purple-600">
              Phone:{" "}
              <a href="tel:+1234567890" className="text-teal-500 hover:underline font-semibold">
                (074) 642-2396
              </a>
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">Follow Us</h3>
            <div className="space-y-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:text-teal-500 text-lg font-semibold"
              >
                🌐 Facebook
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:text-teal-500 text-lg font-semibold"
              >
                📸 Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:text-teal-500 text-lg font-semibold"
              >
                🐦 Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-teal-500 pt-4 text-center">
          <p className="text-lg text-gray-800">
            &copy; 2024 TechArtistry Design. {translate("footerText")}
          </p>
        </div>
      </div>

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
