import { IUser } from "../../type/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Define initial state without accessing localStorage
const initialState: {
    user: IUser | null;
} = {
    user: null,
};

// Create a slice
const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload?.token;
            if (action.payload) {
                Cookies.set("user",action.payload.user);
            } else {
                Cookies.remove("user");
            }
            // Check if localStorage is available before using it
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        },
        logout: (state, action) => {
            state.user = null;
            // Check if localStorage is available before using it
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        },
    },
});

// Export actions and reducer
export const { setUser, logout } = generalSlice.actions;
export default generalSlice.reducer;
