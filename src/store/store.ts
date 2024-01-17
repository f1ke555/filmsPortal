import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filmReducer from './reducers/FilmSlice'
import userReducer from './reducers/UserSlice'
import filmFilterReducer from './reducers/FilterSlice'



const rootReducer = combineReducers({
    filmReducer, userReducer, filmFilterReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']