import { configureStore, combineReducers } from "@reduxjs/toolkit";

const initialState = {
token : ""
};



export const userToken = (token) => ({
    type: "userToken",
    payload: { token : token },
  });

const reducer = combineReducers({
    token: token_reducer
    });

function token_reducer(state = initialState, action) {
    let res = action.payload
    console.log(action.type)
    if (action.type === "userToken") {
        return {
            token: res.token
        };
    } 
    return state;
}

export const store = configureStore({
    reducer
  })
