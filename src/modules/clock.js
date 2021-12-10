const SET_TIME = 'clock/SET_TIME';

export const setTime = (hours, minutes, seconds) => {
  return {
    type: SET_TIME,
    hours,
    minutes,
    seconds,
  };
};

const now = new Date();

const initialState = {
  hours: now.getHours(),
  minutes: now.getMinutes(),
  seconds: now.getSeconds(),
};

function clock(state = initialState, action) {
  switch (action.type) {
    case SET_TIME:
      return {
        hours: action.hours,
        minutes: action.minutes,
        seconds: action.seconds,
      };
    default:
      return state;
  }
}

export default clock;
