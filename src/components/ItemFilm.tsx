import React, {FC, useState} from 'react';
import {IFilm} from "../models/IFilm";

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
            </div>
        </div>

    );
};

export default ItemFilm;