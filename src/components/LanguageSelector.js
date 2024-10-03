import React from 'react';
import { useLanguage } from '../LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <label htmlFor="language-select">Choose a language:</label>
      <select id="language-select" value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="af">Afrikaans</option>
        <option value="zu">Zulu</option>
        <option value="xh">Xhosa</option>
        <option value="ts">Tswana</option>
        <option value="sn">Shona</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
