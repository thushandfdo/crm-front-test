import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./middleware/api";
import { ENDPOINTS } from "./middleware/api";

export const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        list: [],
        loading: false
    },
    reducers: {
        customersRequested: (state) => {
            state.loading = true;
        },
        customersRequestFailed: (state) => {
            state.loading = false;
        },
        customersReceied: (state, action) => {
            state.list = action.payload;
            state.loading = false;
        },
        customerAdded: (state, action) => {
            state.list.push(action.payload);
        },
        customerUpdated: (state, action) => {
            const index = state.list.findIndex(customer => customer.userIdd === action.payload.userId);
            state.list[index] = action.payload.customer;
        },
        customerRemoved: (state, action) => {
            return state.list.filter(customer => customer.userIdd !== action.payload.userId);
        }
    }
})

const {
    customersRequested,
    customersRequestFailed,
    customersReceied,
    customerAdded,
    customerUpdated,
    customerRemoved
} = customerSlice.actions;

export default customerSlice.reducer;

// Action Creators

const url = ENDPOINTS.customer;

export const loadCustomers = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: customersRequested.type,
            onSuccess: customersReceied.type,
            onError: customersRequestFailed.type
        })
    );
};

export const addCustomer = (customer) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            method: 'post',
            data: customer,
            onSuccess: customerAdded.type,
        })
    );
};

export const updateCustomer = (userId, customer) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + userId,
            method: 'patch',
            data: customer,
            onSuccess: customerUpdated.type,
        })
    );
};

export const removeCustomer = (userId) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + userId,
            method: 'delete',
            data: userId,
            onSuccess: customerRemoved.type,
        })
    );
};

// Selectors
