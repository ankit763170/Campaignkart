import { IUser } from "../../type/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: {
    user: IUser | null;
} = {
    user: null,
};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
            if (action.payload && action.payload.token) {
                Cookies.set("token", action.payload.token);
            } else {
                Cookies.remove("token");
            }
        },
    },
});

export const { setUser } = generalSlice.actions;
export default generalSlice.reducer;
