import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {checkCurrentUser} from "../store/reducers/UserSlice";

const HistorySearchPage = () => {
    const {currentUser} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(checkCurrentUser())
    }, []);

    return (
        <div className='container pt-4'>
            <h1>История поиска </h1>
            {!currentUser?.historySearch.length && <h1>Вы не добавили фильмы в избранное</h1>}
            <div className='gap-4'>
                {currentUser?.historySearch.map((filters, index) => (
                    <div className='card mb-4' key={index}>
                        <div className='card-body'>
                            <h5 className='card-title'>Поиск {index + 1}</h5>
                            <p className='card-text'><strong>Жанр фильма: </strong>{filters.genre.name}</p>
                            <p className='card-text'><strong>Статус фильма: </strong>{filters.status.name}</p>
                            <p className='card-text'><strong>Тип фильма: </strong>{filters.type.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistorySearchPage;