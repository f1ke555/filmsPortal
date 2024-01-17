import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchFilms, fetchFilters} from "../store/reducers/ActionCreators";
import Spinner from "../components/Spinner";
import FilmList from "../components/FilmList";
import Filters from "../components/Filters";
import {resetFilters} from "../store/reducers/FilterSlice";

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { films,isLoading, error} = useAppSelector((state) => state.filmReducer);
    const [limit, setLimit] = useState(20)

    useEffect(() => {
        dispatch(fetchFilters())
        dispatch(fetchFilms(limit))
        dispatch(resetFilters())
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                setLimit(limit => limit + 10)
                dispatch(fetchFilms(limit))
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [limit]);


    if (isLoading) {
        return <Spinner/>
    }


    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className='pt-4 container'>
            <Filters/>
            <FilmList films={films}/>
        </div>
    );
};

export default MainPage;