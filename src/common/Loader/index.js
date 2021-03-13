import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './styles/index.css';

/**
 * Component for displaying Loader Graphics
 * @param {string} loadingMessage - A text to be displayed below Loader.
 * @param {string} className - external css class to extend styling
 * @returns {Element} Rendered loading component
 */
const Loader = ({ loadingMessage, className }) => {
  return (
    <div className={classnames('loader', className, 'page-active')}>
      <span className="loading-icon" />
      {loadingMessage && <p className="loading-message">{loadingMessage}</p>}
    </div>
  );
};

Loader.propTypes = {
  loadingMessage: PropTypes.string,
  className: PropTypes.string
};

Loader.defaultProps = {
  loadingMessage: '',
  className: ''
};

// Export the react component
export default Loader;
