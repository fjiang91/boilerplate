import dummyReducer from './dummyReducer';
import { combineReducers } from 'react-redux';

//Root Reducer - Combine Reducers
const rootReducer = combineReducers({
  dummyReducer: dummyReducer
})

export default rootReducer;
