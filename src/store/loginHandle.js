import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./middleware/api";
import { ENDPOINTS } from "./middleware/api";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        logged: false,
        token: null,
        currentUser: {
            userId: null,
            username: '',
            name: 'User',
            role: 'unknown',
            pic: '-'
        }
    },
    reducers: {
        loggedIn: (state, action) => {
            state.token = action.payload;
            state.logged = true;
        },
        gotTokenData: (state, action) => {
            state.currentUser.userId = action.payload.userId;
            state.currentUser.name = action.payload.firstName + ' ' + action.payload.lastName;
            state.currentUser.username = action.payload.username;
            state.currentUser.role = action.payload.type;

            const content = action.payload.profilePic;

            if (content !== null) {
                state.currentUser.pic = `data:image/png;base64,${content.fileContents}`;
            }
        }
    }
})

const {
    loggedIn,
    gotTokenData
} = loginSlice.actions;

export default loginSlice.reducer;

// Action Creators

const url = ENDPOINTS.login;

export const logIn = (data) => (dispatch, getState) => {
    const logUrl = url + '/Login';

    dispatch(
        apiCallBegan({
            url: logUrl,
            method: 'post',
            data: data,
            onSuccess: loggedIn.type,
        })
    ).then(() => dispatch(
        apiCallBegan({
            url,
            onSuccess: gotTokenData.type,
        })
    ));
};

export const getTokenData = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onSuccess: gotTokenData.type,
        })
    );
}

// Selectors

// export const getLoggedStatus = state => state.login.logged;

export const getLoggedStatus = () => createSelector(
    state => state.login.logged === true
);
