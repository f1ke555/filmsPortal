import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";

interface UserState {
    users: IUser[];
    currentUser: IUser | null;
    errorEmail: boolean;
    errorPassword: boolean;
}

const initialState: UserState = {
    users: [],
    currentUser: null,
    errorEmail: false,
    errorPassword: false
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<IUser>) => {
            if (localStorage.getItem(action.payload.email)) {
                console.log('Пользователь с таким email уже существует');
            } else {
                localStorage.setItem(action.payload.email, JSON.stringify(action.payload));
                state.users.push(action.payload);
            }
        },
        logInUser: (state, action: PayloadAction<IUser>) => {
            const storedUserJSON = localStorage.getItem(action.payload.email);

            if (storedUserJSON) {
                const storedUser = JSON.parse(storedUserJSON);

                if (storedUser.password === action.payload.password) {
                    localStorage.setItem('currentUser', storedUserJSON);
                    state.currentUser = storedUser;
                } else {
                    state.errorPassword = true
                }
            } else {
                state.errorEmail = true
            }
        },
        logOut: (state) => {
            localStorage.removeItem('currentUser');
            state.currentUser = null;
        },
        checkCurrentUser: (state) => {
            const currentUserJSON = localStorage.getItem('currentUser');
            state.currentUser = currentUserJSON ? JSON.parse(currentUserJSON) : null;
        },
    },
});

const { actions, reducer } = userSlice;


export const { addNewUser,
    logInUser,
    logOut,
    checkCurrentUser,
    } = actions;
export default userSlice.reducer;