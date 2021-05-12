import React, { forwardRef } from 'react';
import Modal from '../../common/Modal';
import apiConfig from '../../api.config';
import TextInput from '../../common/TextInput';

import './index.scss';

const Photos = (props, ref) => {
  const {
    photoList: { photos: { photo = [] } = {} } = {},
    isOpen,
    handleSearch,
    onPhotoClick,
    onModalClose,
    photoClickData
  } = props || {};

  const { id, server, secret, title } = photoClickData || {};

  const {
    getImage: { url: getImageURL }
  } = apiConfig;
  return (
    <div className="photos-container">
      <div className="photo-search-container">
        <h2 className="photo-list-heading">Search Photos</h2>
        <TextInput classname="photo-search-input" handleSearch={handleSearch} />
      </div>
      <div className="photo-results" ref={ref}>
        <ul>
          {photo.map(({ id, server, secret, title }) => (
            <li key={id}>
              <img
                className="photo-img"
                src={`${getImageURL}/${server}/${id}_${secret}_w.jpg}`}
                alt={title}
                onClick={event => onPhotoClick(event, { id, server, secret, title })}
              />
            </li>
          ))}
        </ul>
        {isOpen && (
          <Modal isClose handleModalClose={onModalClose}>
            <img className="photo-img" src={`${getImageURL}/${server}/${id}_${secret}_w.jpg}`} alt={title} />
          </Modal>
        )}
      </div>
    </div>
  );
};
export default forwardRef(Photos);
