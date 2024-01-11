import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchFilmById} from "../store/reducers/ActionCreators";
import Spinner from "../components/Spinner";

const FilmPage = () => {

    const {id} = useParams()
    const {filmById, isLoading, error} = useAppSelector(state => state.filmReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchFilmById(Number(id)))
    }, [id]);

    if (isLoading) {
        return <Spinner/>
    }


    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className='container'>
            <div className="movie-page pt-4">
                <img src={filmById?.poster.url} alt={filmById?.name} className="movie-poster"/>
                <div className="movie-details">
                    <h1>{filmById?.name}</h1>
                    <p className='d-flex'>
                        <strong>Жанр:</strong>
                        {filmById?.genres && (
                            <div className='d-flex gap-2'>
                                {filmById.genres.map((genre, index) => (
                                    <p className='genre-card' key={index}>{genre.name}</p>
                                ))}
                            </div>
                        )}
                    </p>
                    <p>{filmById?.description}</p>
                    <p><strong>Возрастное ограничение:</strong> {filmById?.ageRating} лет</p>
                    <p><strong>Дата выхода:</strong> {filmById?.year} год</p>
                    <p><strong>Длительность:</strong> {filmById?.movieLength} мин</p>
                </div>
            </div>
        </div>
    );
};

export default FilmPage;