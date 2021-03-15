import { LIVE, PAST, UPCOMING } from '../constants';
const checkDateStatus = date2 => {
  let status;
  const result = new Date().setHours(0, 0, 0, 0) - new Date(Number(date2)).setHours(0, 0, 0, 0);

  switch (result > 0) {
    case true:
      status = PAST;
      break;
    case false:
      switch (result < 0) {
        case true:
          status = UPCOMING;
          break;
        case false:
          status = LIVE;
          break;
        default: {
          status = LIVE;
        }
      }
      break;
    default: {
      status = LIVE;
    }
  }

  return status;
};

/**
 * Check if its mobile device or not
 * @returns {boolean} empty or not
 */
const isMobileDevice = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export { checkDateStatus, isMobileDevice };
