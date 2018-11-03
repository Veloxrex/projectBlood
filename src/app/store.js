import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../redux/reducers';
import socketClient from './../helpers/socket';



// const socket = io('http://localhost:5000');
const loggerMiddleware = createLogger();

const middleware = applyMiddleware(thunkMiddleware);
// , loggerMiddleware
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(middleware)
);

// socketClient(store,socket);
export default store;