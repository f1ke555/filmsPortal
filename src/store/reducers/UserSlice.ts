import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {IFilm} from "../../models/IFilm";
import {IFilters} from "../../models/IFilters";

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
                alert('Пользователь с таким email уже существует')
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
                    alert('Вы ввели неверный пароль')
                }
            } else {
                alert('Вы ввели несуществующий email')
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
        addFavoriteFilm: (state, action: PayloadAction<IFilm>) => {
            // @ts-ignore
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            const checkFilmArray = currentUser.favoriteFilms.find(film => film.name === action.payload.name)
            if (!checkFilmArray) {
                currentUser.favoriteFilms.push(action.payload)
            } else {
                currentUser.favoriteFilms = currentUser.favoriteFilms.filter(film => film.name !== action.payload.name);
            }
            localStorage.setItem(currentUser.email, JSON.stringify(currentUser))
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
        },
        addHistorySearch: (state, action: PayloadAction<IFilters>) => {
            // @ts-ignore
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            if (currentUser) {
                currentUser.historySearch.push(action.payload)
                localStorage.setItem(currentUser.email, JSON.stringify(currentUser))
                localStorage.setItem('currentUser', JSON.stringify(currentUser))
            } else {
                alert('Для того, чтобы отображалась история поиска по фильтрам, нужно зарегистироваться.')
            }
        }
    },
});

const { actions, reducer } = userSlice;


export const { addNewUser,
    logInUser,
    logOut,
    checkCurrentUser,
    addFavoriteFilm,
    addHistorySearch,
    } = actions;
export default userSlice.reducer;