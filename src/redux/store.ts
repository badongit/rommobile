import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './reducers';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSagas);

export default store;
