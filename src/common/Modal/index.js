/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';

const Modal = props => {
  const { children, isClose, handleModalClose } = props;

  // Portals --> to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
  return ReactDOM.createPortal(
    <aside className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-heading">
      <div className="theme" />
      <div className="modal-content-wrapper">
        <div className="modal-container">{children}</div>
      </div>
      {isClose && (
        <button className="close-button" onClick={handleModalClose}>
          x
        </button>
      )}
    </aside>,
    document.getElementById('modal')
  );
};

export default Modal;
