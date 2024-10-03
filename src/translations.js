const translations = {
    en: {
      about: "About Us",
      contact: "Contact",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
    af: {
      about: "Oor Ons",
      contact: "Kontak",
      terms: "Voorwaardes van Diens",
      privacy: "Privaatheidsbeleid",
    },
    zu: {
      about: "Mayelana Nathi",
      contact: "Xhumana",
      terms: "Imigomo Yokusebenza",
      privacy: "Inqubomgomo Yobumfihlo",
    },
    xh: {
      about: "Ngathi",
      contact: "Xhumana",
      terms: "Imigomo YoMsebenzi",
      privacy: "Umgaqo-nkqubo Wobumfihlo",
    },
    ts: {
      about: "Ka rona",
      contact: "Khampha",
      terms: "Meetso ya Tshebeletso",
      privacy: "Phetho ya Bophelo",
    },
    sn: {
      about: "Nezvedu",
      contact: "Bata",
      terms: "Mitemo yeSevhisi",
      privacy: "Mutemo weKuchengetedzwa",
    },
    // Add other translations as needed
  };
  
  export const translate = (key, language) => {
    return translations[language][key] || translations['en'][key]; // Fallback to English if key not found
  };
  