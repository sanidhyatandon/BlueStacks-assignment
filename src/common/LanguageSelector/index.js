import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { isMobileDevice } from '../../common/utilities';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const changeLanguage = event => {
    console.log(event.target.value, 'event');
    i18n.changeLanguage(event.target.value);
  };

  // to check if mobile device.
  const isMobile = isMobileDevice();

  return (
    <div onChange={changeLanguage} className={classnames('align-right', isMobile && 'mt-24', 'mr-8')}>
      <input type="radio" value="en" name="language" defaultChecked className="mr-8" />
      <label className="mr-24">English</label>
      <input type="radio" value="gr" name="language" className="mr-8" />
      <label>German</label>
    </div>
  );
};

export default LanguageSelector;
