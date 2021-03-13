import { LIVE, PAST, UPCOMING } from '../constants';
const checkDateStatus = date2 => {
  debugger;
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

export { checkDateStatus };
