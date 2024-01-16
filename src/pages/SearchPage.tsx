import React from 'react';
import {useAppSelector} from "../hooks/redux";
import FilmList from "../components/FilmList";
import Filters from "../components/Filters";
import Spinner from "../components/Spinner";

const SearchPage = () => {
    const {filteredFilms, isLoadingFilters, error} = useAppSelector(state => state.filmFilterReducer)

    if (isLoadingFilters) {
        return <Spinner/>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className='container pt-4'>
            <h1>Поиск</h1>
            <Filters/>
            <FilmList films={filteredFilms}/>
        </div>
    );
};

export default SearchPage;