import { combineReducers } from 'redux';
import clock from './clock';

const rootReducer = combineReducers({
  clock,
});

export default rootReducer;
