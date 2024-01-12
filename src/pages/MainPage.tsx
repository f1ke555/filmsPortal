import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchFilms} from "../store/reducers/ActionCreators";
import Spinner from "../components/Spinner";
import FilmList from "../components/FilmList";
import search from '../img/search.png'

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { films, isLoading, error } = useAppSelector((state) => state.filmReducer);
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(fetchFilms());
    }, []);

    const handleChangeSearch = (textSearch) => {
        setSearch(textSearch)
        console.log(textSearch)
    }

    if (isLoading) {
        return <Spinner/>
    }


    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className='pt-4 container'>
            <input value={search} onChange={(e) => handleChangeSearch(e.target.value)} placeholder='Поиск'/>
            <img width={30} height={30} src={search}/>
            <FilmList films={films}/>
        </div>
    );
};

export default MainPage;