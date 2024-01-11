import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchFilms} from "../store/reducers/ActionCreators";
import Spinner from "../components/Spinner";
import FilmList from "../components/FilmList";

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { films, isLoading, error } = useAppSelector((state) => state.filmReducer);

    useEffect(() => {
        dispatch(fetchFilms());
    }, []);

    if (isLoading) {
        return <Spinner/>
    }


    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className='pt-4 container'>
            <FilmList films={films}/>
        </div>
    );
};

export default MainPage;