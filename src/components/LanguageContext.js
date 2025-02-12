import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translate = (key) => {
    const translations = {
      en: {
        footerText: "All rights reserved.",
        about: "About Us",
        contact: "Contact Us",
        terms: "Terms of Service",
        privacy: "Privacy Policy",
      },
      es: {
        footerText: "Todos los derechos reservados.",
        about: "Sobre Nosotros",
        contact: "Contáctenos",
        terms: "Términos del Servicio",
        privacy: "Política de Privacidad",
      },
    };
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ translate, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);