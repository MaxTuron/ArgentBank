import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig ={
    key: 'main-root',
    storage
}
const initialState = {
    isLoggedIn: false,
    token: "",
    firstName: "",
    lastName: ""
};

export const isLoggedIn = () => ({ type: 'isLoggedIn' });
export const userLogout = () => ({ type: 'userLogout' });
export const userFirstName = (firstName) => ({ 
    type: 'firstName',
    payload: {firstName: firstName},
});
export const userLastName = (lastName) => ({ 
    type: 'lastName',
    payload: {lastName: lastName},
});
export const userToken = (token) => ({
    type: "userToken",
    payload: { token: token },
  });

const reducer = combineReducers({
    isLoggedIn: login_reducer,
    token: token_reducer,
    firstName: firstName_reducer,
    lastName: lastName_reducer,
    });

const rootReducer = (state, action) => {
    if (action.type === 'userLogout') {
        state = undefined;
    }
    return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function token_reducer(state = initialState, action) {
    let res = action.payload
    if (action.type === "userToken") {
        return {
            token: res.token
        };
    } 
    return state;
}

function login_reducer(state = initialState, action) {
    let res = action.payload
    if (action.type === "userToken") {
        return {
            isLoggedIn: !res.isLoggedIn
        };
    } 
    return state
}

function firstName_reducer(state = initialState, action) {
    let res = action.payload
    if (action.type === "firstName") {
        return {
            firstName: res.firstName
        };
    } 
    return state;
}

function lastName_reducer(state = initialState, action) {
    let res = action.payload
    if (action.type === "lastName") {
        return {
            lastName: res.lastName
        };
    } 
    return state;
}

export const store = configureStore({
    reducer : persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })

export const persistStor = persistStore(store)