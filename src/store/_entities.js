import { combineReducers } from "@reduxjs/toolkit";
import customerReducer from './customerHandle';

export default combineReducers({
    customers: customerReducer
});