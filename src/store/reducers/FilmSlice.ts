import {IFilm} from "../../models/IFilm";
import {createSlice} from "@reduxjs/toolkit";
import {fetchFilmById, fetchFilms} from "./ActionCreators";

interface FilmState {
    films: IFilm[];
    isLoading: boolean;
    error: string;
    filmById: IFilm | null;
}

const initialState: FilmState = {
    films: [],
    isLoading: false,
    error: '',
    filmById: null,
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
            .addCase(fetchFilmById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFilmById.fulfilled, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.filmById = action.payload;
            })
            .addCase(fetchFilmById.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload;
            })
    },
});

export default filmSlice.reducer;