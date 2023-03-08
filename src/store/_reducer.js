import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducer from './_entities';

export default combineReducers({
    entities: entitiesReducer
});