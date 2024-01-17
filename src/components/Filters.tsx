import React from 'react';
import {
    addFilterGenre,
    addFilterStatus,
    addFilterType,
    resetFilters,
    setSearchValue
} from "../store/reducers/FilterSlice";
import {fetchFilmByName, fetchFilmsByFilters} from "../store/reducers/ActionCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addHistorySearch} from "../store/reducers/UserSlice";
import {useNavigate} from "react-router-dom";
import Spinner from "./Spinner";

const Filters = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const {filters, current, searchValue, isLoadingFilters } = useAppSelector((state) => state.filmFilterReducer);

    const handleChangeFilterByGenre = (e) => {
        dispatch(addFilterGenre(e.target.value));
    }

    const handleChangeFilterByStatus = (e) => {
        dispatch(addFilterStatus(e.target.value));
    }

    const handleChangeFilterByType = (e) => {
        dispatch(addFilterType(e.target.value));
    }

    const handleClickFiltersFilm = () => {
        // @ts-ignore
        dispatch(fetchFilmsByFilters(current));
        // @ts-ignore
        dispatch(addHistorySearch(current));
        navigate('/search');
    }

    const handleResetFilters = () => {
        dispatch(resetFilters());
        navigate('/');
    };

    const handleChangeSearch = (event) => {
        // @ts-ignore
        const newValue = event.target.value;
        dispatch(setSearchValue(newValue));
    };

    const handleClickSearch = (event) => {
        dispatch(fetchFilmByName(searchValue));
        navigate('/search');
    };

    const handleEnterSearch = (event) => {
        if (event.key === 'Enter') {
            dispatch(fetchFilmByName(searchValue));
            navigate('/search');
        }
    }

    const handleClickResetSearch = () => {
        dispatch(setSearchValue(''));
        navigate('/');
    };

    if (isLoadingFilters) {
        return <Spinner/>;
    }

    return (
        <div>
            <div className='row'>
                <div className='col'>
                    <input
                        onKeyDown={handleEnterSearch}
                        value={searchValue}
                        onChange={handleChangeSearch}
                        placeholder='Поиск'
                        className='form-control'
                    />
                </div>
                <div className='col-auto'>
                    <button className='btn btn-info' onClick={handleClickSearch}>Поиск</button>
                </div>
                <div className='col-auto'>
                    <button className='btn btn-light' onClick={handleClickResetSearch}>
                        Сбросить поиск
                    </button>
                </div>
            </div>
            <div className='d-flex gap-4 pt-4'>
                <select onClick={handleChangeFilterByGenre} className="form-select"
                        aria-label="Default select example">
                    <option selected>{current?.genre.name !== 'Не указано' ? current?.genre.name : 'Жанр фильма'}</option>
                    {filters[0]?.map((filterName, index) => {
                        // @ts-ignore
                        return <option key={index} value={filterName?.name}>{filterName?.name}</option>;
                    })}
                </select>
                <select onClick={handleChangeFilterByStatus} className="form-select"
                        aria-label="Default select example">
                    <option selected>{current?.status.name !== 'Не указано' ? current?.status.name : 'Статус фильма'}</option>
                    {filters[1]?.map((filterName, index) => {
                        // @ts-ignore
                        return <option key={index} value={filterName?.name}>{filterName?.name}</option>;
                    })}
                </select>
                <select onClick={handleChangeFilterByType} className="form-select"
                        aria-label="Default select example">
                    <option selected>{current?.type.name !== 'Не указано' ? current?.type.name : 'Тип'}</option>
                    {filters[2]?.map((filterName, index) => {
                        // @ts-ignore
                        return <option key={index} value={filterName?.name}>{filterName?.name}</option>;
                    })}
                </select>
                <button onClick={handleClickFiltersFilm} className='btn btn-info'>Показать</button>
                <button onClick={handleResetFilters} className='btn btn-light'>Очистить фильтр</button>
            </div>
        </div>
    );
};

export default Filters;