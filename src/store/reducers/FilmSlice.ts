import {IFilm} from "../../models/IFilm";
import {createSlice} from "@reduxjs/toolkit";
import {fetchFilms} from "./ActionCreators";

interface FilmState {
    films: IFilm[];
    isLoading: boolean;
    error: string;

}

const initialState: FilmState = {
    films: [],
    isLoading: false,
    error: '',

}

const filmSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.films = action.payload;
            })
            .addCase(fetchFilms.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload;
            })
    },
});

export default filmSlice.reducer;