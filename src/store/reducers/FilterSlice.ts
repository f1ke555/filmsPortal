import {IFilm} from "../../models/IFilm";
import {createSlice} from "@reduxjs/toolkit";
import {fetchFilmByName, fetchFilmsByFilters, fetchFilters} from "./ActionCreators";
import {IFilters} from "../../models/IFilters";


interface FilterState {
    filteredFilms: IFilm[];
    isLoadingFilters: boolean;
    error: string;
    filters: [
        genres: [],
        status: [],
        types: [],
    ];
    searchValue: string;
    current: IFilters | null
}

const initialState: FilterState = {
    filteredFilms: [],
    isLoadingFilters: false,
    error: '',
    searchValue: '',
    filters: [
        [],
        [],
        [],
    ],
    current: {
        genre: {name: 'Не указано'},
        status: {name: 'Не указано'},
        type: {name: 'Не указано'},
    }
}

const filmFilterSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        addFilterGenre: (state, action) => {
            // @ts-ignore
            state.current.genre.name = action.payload
        },
        addFilterStatus: (state, action) => {
            // @ts-ignore
            state.current.status.name = action.payload
        },
        addFilterType: (state, action) => {
            // @ts-ignore
            state.current.type.name = action.payload
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        resetFilters: (state) => {
            state.current = initialState.current
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilmByName.pending, (state) => {
                state.isLoadingFilters = true;
            })
            .addCase(fetchFilmByName.fulfilled, (state, action) => {
                state.isLoadingFilters = false;
                // @ts-ignore
                state.filteredFilms = action.payload;
            })
            .addCase(fetchFilmByName.rejected, (state, action) => {
                state.isLoadingFilters = false;
                // @ts-ignore
                state.error = action.payload;
            })
            .addCase(fetchFilmsByFilters.pending, (state) => {
                state.isLoadingFilters = true;
            })
            .addCase(fetchFilmsByFilters.fulfilled, (state, action) => {
                state.isLoadingFilters = false;
                // @ts-ignore
                state.filteredFilms = action.payload;
            })
            .addCase(fetchFilmsByFilters.rejected, (state, action) => {
                state.isLoadingFilters = false;
                // @ts-ignore
                state.error = action.payload;
            })
            .addCase(fetchFilters.pending, (state) => {
                state.isLoadingFilters = true;
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.isLoadingFilters = false;
                // @ts-ignore
                state.filters = action.payload
            })
            .addCase(fetchFilters.rejected, (state, action) => {
                state.isLoadingFilters = false;
                // @ts-ignore
                state.error = action.payload;
            })
    },
});

const {actions} = filmFilterSlice
export const {
    addFilterGenre,
    addFilterType,
    addFilterStatus,
    setSearchValue,
    resetFilters
} = actions

export default filmFilterSlice.reducer;