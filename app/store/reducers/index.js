import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const fakeReducer = (state = {}) => state;

const rootReducer = combineReducers({
  fakeReducer,
  routing,
});

export default rootReducer;
