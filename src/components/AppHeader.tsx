import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {checkCurrentUser, logOut} from "../store/reducers/UserSlice";


const AppHeader = () => {
    const dispatch = useAppDispatch()
    const {currentUser} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(checkCurrentUser())
    }, []);

    const handleLogOut = () => {
        dispatch(logOut())
    }
    return (
        <div className='header container'>
            <NavLink to='/'>Главная</NavLink>
            <NavLink to='/search'>Поиск</NavLink>
            <NavLink to='/favorites'>Избранное</NavLink>
            <NavLink to='/history'>История поиска</NavLink>
            {currentUser
                ?
                <>
                    <span>{currentUser.firstName} {currentUser.lastName}</span>
                    <button onClick={handleLogOut}>Выйти</button>
                </>
                :
                <>
                    <NavLink to='/signin'>Авторизация</NavLink>
                    <NavLink to='/signup'>Регистрация</NavLink>
                </>
            }
        </div>
    );
};

export default AppHeader;