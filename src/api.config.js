const defaultValues = {
  retry: 0,
  interval: 0,
  timeout: 2000
};

const appPath = 'https://www.flickr.com/services/rest/';

const apiKey = '83a1eebf8fe298813824d11d885af847';
const config = {
  // Current User
  getPhotos: {
    ...defaultValues,
    url: `${appPath}?method=flickr.photos.getRecent&api_key=${apiKey}`
  },
  getImage: {
    ...defaultValues,
    url: `https://live.staticflickr.com`
  },
  searchPhotos: {
    ...defaultValues,
    url: `${appPath}?method=flickr.photos.search&api_key=${apiKey}`
  }
};

export default config;
