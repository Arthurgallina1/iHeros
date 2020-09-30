import { createStore, applyMiddleware, compose } from "redux";

export default (reducers, middlewares) => {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // const apply = applyMiddleware(...middlewares);
    return createStore(
        reducers,
        composeEnhancers(applyMiddleware(...middlewares))
    );
};
