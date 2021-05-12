import React, { useState, useEffect, useCallback, useRef } from 'react';

import apiConfig from '../../api.config';
import PhotoView from '../../components/Photos';
import { debounce, throttle } from '../../common/utilities';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [photoClickData, setpPhotoClickData] = useState([]);

  const resultsRef = useRef(null);

  const handleScroll = () => {
    if (
      resultsRef.current &&
      window.pageYOffset + window.innerHeight > resultsRef.current.clientHeight - window.outerHeight * 0.3
    ) {
      setPage(page => page + 1);
    }
  };

  useEffect(() => {
    resultsRef.current.addEventListener('scroll', throttle(handleScroll, 1000));
    return () => window.removeEventListener('scroll', throttle(handleScroll, 1000));
  }, []);

  useEffect(() => {
    const {
      getPhotos: { url: getPhotosURL }
    } = apiConfig;
    fetch(`${getPhotosURL}&per_page=10&page=${page}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(photoList => setPhotos(photoList))
      .catch(error => console.log(error));
  }, [page]);

  const debouncedCount = useCallback(
    debounce(() => {
      const {
        searchPhotos: { url: searchPhotosURL }
      } = apiConfig;

      console.log(searchTerm, 'searchTerm');

      fetch(`${searchPhotosURL}&per_page=10&text=${searchTerm}&format=json&nojsoncallback=1`)
        .then(response => response.json())
        .then(photoList => setPhotos(photoList))
        .catch(error => console.log(error));
    }, 2000),
    [searchTerm]
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 3) {
      debouncedCount();
    }
  };

  useEffect(() => {
    const {
      getPhotos: { url: getPhotosURL }
    } = apiConfig;
    fetch(`${getPhotosURL}&per_page=10&page=${page}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(photoList => setPhotos(photoList))
      .catch(error => console.log(error));
  }, [page]);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const photoClickHandler = (event, data) => {
    setIsOpen(isOpen => !isOpen);
    setpPhotoClickData(data);
  };

  return (
    <div>
      <div className="photo-list">
        {
          <PhotoView
            ref={resultsRef}
            photoList={photos}
            isOpen={isOpen}
            handleSearch={handleSearch}
            onPhotoClick={photoClickHandler}
            onModalClose={handleModalClose}
            photoClickData={photoClickData}
          />
        }
      </div>
    </div>
  );
};

export default Photos;
