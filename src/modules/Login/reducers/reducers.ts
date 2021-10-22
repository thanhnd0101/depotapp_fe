import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type LoginPayLoad = {
    username: string,
    token: string,
    id: string,
}

interface userState {
    token: string,
    username: string,
    id: string,
}

const initialState: userState = {
    token: '',
    username: '',
    id: '',
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginAction: (state: userState, action: PayloadAction<LoginPayLoad>) => {
            state.token = action.payload.token;
            state.username= action.payload.username;
            state.id= action.payload.id;
        }
    }
});

export const { loginAction } = loginSlice.actions

export default loginSlice.reducer
