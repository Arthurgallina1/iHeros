import { createStore, applyMiddleware } from "redux";

import moxios from "moxios";

import rootReducer from "../store/modules/rootReducer";
import { middlewares } from "./store";

export const dataMock = {
    success: true,
    hero: {
        releaseTime: "2020-10-06T14:12:20.723Z",
        _id: "5f7c95fbbb311800114b1d5b",
        name: "Pao de Coco",
        rank: "B",
        location: {
            coordinates: [-15.05, 51.35],
            _id: "5f7c95fbbb311800114b1d5c",
            type: "Point",
        },
        createdAt: "2020-10-06T16:06:19.593Z",
        updatedAt: "2020-10-06T16:06:19.593Z",
        __v: 0,
    },
};

export const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(
        createStore
    );
    return createStoreWithMiddleware(rootReducer, initialState);
};

export const findByTestAttribute = (wrapper, val) => {
    return wrapper.find(`[data-test='${val}']`);
};

export const getCall = () => {};
