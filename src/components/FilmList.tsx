import React, {FC} from 'react';
import ItemFilm from "./ItemFilm";
import {IFilm} from "../models/IFilm";

interface FilmListProps {
    films: IFilm[]
}

const FilmList: FC<FilmListProps> = ({films}) => {
    return (
        <div className='row row-cols-3 gap-4'>
            {films?.map((film) => (
                <ItemFilm key={film.id} film={film}/>
            ))}
        </div>
    );
};

export default FilmList;