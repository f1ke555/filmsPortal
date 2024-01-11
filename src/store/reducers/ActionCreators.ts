import {createAsyncThunk} from "@reduxjs/toolkit";
const apiKey1 = 'Y18CETC-8J6MQ64-P5T12ET-B783NYA'
const apiKey2 = 'QBYBJP7-P974ZRR-HJW7F7T-4M1PDA5'
export const fetchFilms = createAsyncThunk(
    'films/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': `${apiKey2}`,
                    'Content-Type': 'application/json',
                }
            });

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
    'films/fetchid',
    async (id: number, thunkAPI) => { // Передаем 'id' в качестве параметра
        try {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': `${apiKey2}`,
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const movieData = await response.json();
                return movieData
            }

        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить фильмы');
        }
    }
)