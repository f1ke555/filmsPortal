import React from 'react';
import {NavLink} from "react-router-dom";
const AppHeader = () => {
    return (
        <div className='header container'>
            <NavLink to='/'>Главная</NavLink>
            <NavLink to='/search'>Поиск</NavLink>
            <NavLink to='/favorites'>Избранное</NavLink>
            <NavLink to='/history'>История поиска</NavLink>
            <NavLink to='/favorites'>Избранное</NavLink>
            <NavLink to='/history'>История поиска</NavLink>
            <NavLink to='/signin'>Авторизация</NavLink>
            <NavLink to='/signup'>Регистрация</NavLink>
        </div>
    );
};

export default AppHeader;