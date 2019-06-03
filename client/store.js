import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer/rootReducer';
import thinkMiddleWare from 'redux-thunk';
import { createLogger } from 'redux-logger';

//Thunk Middlewares
const thunkMiddleWare = applyMiddleware(thunkMiddleWare, createLogger())

//Redux Store with CombineReducers and Thunk Middleware
const store = createStore(rootReducer, thunkMiddleWare);

export default store;
