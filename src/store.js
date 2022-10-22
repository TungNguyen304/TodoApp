import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "./store/reducer";

const store = legacy_createStore(
  rootReducer, undefined, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  
);
export default store;
