import {createAsyncThunk} from "@reduxjs/toolkit";
import {IFilters} from "../../models/IFilters";
const apiKey1 = 'Y18CETC-8J6MQ64-P5T12ET-B783NYA'
const apiKey2 = 'QBYBJP7-P974ZRR-HJW7F7T-4M1PDA5'
const apiKey3 = 'H440JD2-JXV4HXZ-NTFM892-8Z67GS1'
const apiKey4 = 'H3X8TVQ-85MMT8K-MZWR35A-MNKKHB3'
const apiKey5 = 'SJ3J51J-1Z5MQAM-JC4NSWY-MNY7E83'

const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'X-API-KEY': `${apiKey2}`}
};
export const fetchFilms = createAsyncThunk(
    'films/fetchAll',
    async (limit: number, thunkAPI) => {
        try {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=1&limit=${limit}`, options);

            if (response.ok) {
                const movieData = await response.json();
                return movieData.docs;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить фильмы')
        }
    }
);

export const fetchFilmById = createAsyncThunk(
    'films/fetchFilmById',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, options)

            if (response.ok) {
                const movieData = await response.json();
                return movieData
            }

        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить фильмы');
        }
    }
)

export const fetchFilmByName = createAsyncThunk(
    'films/fetchFilmByName',
    async (name: string, thunkAPI) => {
        try {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?query=${name}`, options)

            if (response.ok) {
                const movieData = await response.json();
                return movieData.docs
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить фильмы');
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'films/fetchFilters',
    async (_, thunkAPI) => {
        const fields = ['genres.name', 'status', 'type'];
        try {
            const responses = await Promise.all(
                fields.map(async (field) => {
                    const response = await fetch(`https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=${field}`, options);
                    if (response.ok) {
                        const filtersData = await response.json();
                        return filtersData;
                    } else {
                        throw new Error('Не удалось загрузить фильтры');
                    }
                })
            );
            return responses;
        } catch (e) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const fetchFilmsByFilters = createAsyncThunk(
    'films/fetchFilmsByFilters',
    async (filters: IFilters, thunkAPI) => {
        const baseUrl = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10';
        const queryParams = [];
        if (filters.type.name !== 'Не указано') {
            // @ts-ignore
            queryParams.push(`&type=${filters.type.name}`);
        }
        if (filters.status.name !== 'Не указано') {
            // @ts-ignore
            queryParams.push(`&status=${filters.status.name}`);
        }
        if (filters.genre.name !== 'Не указано') {
            // @ts-ignore
            queryParams.push(`&genres.name=${filters.genre.name}`);
        }

        const apiUrl = `${baseUrl}${queryParams.join('&')}`;

        try {
            const response = await fetch(apiUrl, options);

            if (response.ok) {
                const movieData = await response.json();
                return movieData.docs
            }

        } catch (e) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)