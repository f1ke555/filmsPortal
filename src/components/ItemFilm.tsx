import React, {FC, useState} from 'react';
import {IFilm} from "../models/IFilm";
import {Link} from "react-router-dom";

interface FilmItemProps {
    film: IFilm
}
const ItemFilm: FC <FilmItemProps> = ({film}) => {
    return (
        <div className="card col" style={{width: 300, padding: 1}}>
            <img className='card-img-top' src={film.poster.url}/>
            <div className='card-body'>
                <h2 className='card-title'>{film.name}</h2>
                <h5>{film.shortDescription}</h5>
                <Link className='btn btn-primary' to={`/film/${film.id}`}>Подробнее</Link>
            </div>
        </div>

    );
};

export default ItemFilm;