import React from 'react';

import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = event => {
    console.log(event.target.value, 'event');
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div onChange={changeLanguage} className="align-right mr-8">
      <input type="radio" value="en" name="language" defaultChecked className="mr-8" />
      <label className="mr-24">English</label>
      <input type="radio" value="gr" name="language" className="mr-8" />
      <label>German</label>
    </div>
  );
};

export default LanguageSelector;
