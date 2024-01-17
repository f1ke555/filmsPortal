import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import ItemFilm from "../components/ItemFilm";
import {useEffect} from "react";
import {checkCurrentUser} from "../store/reducers/UserSlice";

const FavoritesFilmsPage = () => {
    const {currentUser} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkCurrentUser())
    }, []);

    return (
        <div className='container pt-4'>
            <h1>Избранное</h1>
            {!currentUser?.favoriteFilms.length && <h1>Вы не добавили фильмы в избранное</h1>}
            <div className='row row-cols-3 gap-4 pt-4'>
                {currentUser?.favoriteFilms.map((film) => (
                    <ItemFilm key={film.id} film={film} />
                ))}
            </div>
        </div>
    );
};

export default FavoritesFilmsPage;