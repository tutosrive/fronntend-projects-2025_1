// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/User";

interface UserState {
    user: User | null;
}

const storedUser = localStorage.getItem("user");
const initialState: UserState = {
    user: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("user");
            }
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;