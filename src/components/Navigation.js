// src/components/Navigation.js

import React from 'react';
import { useLanguage } from './LanguageContext';
import { translations } from '../translations'; // Import translations

const Navigation = () => {
  const { language } = useLanguage();
  const t = translations[language]; // Get translations for the current language

  return (
    <nav>
      <ul>
        <li><a href="#about">{t.about}</a></li>
        <li><a href="#contact">{t.contact}</a></li>
        <li><a href="#terms">{t.terms}</a></li>
        <li><a href="#privacy">{t.privacy}</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
