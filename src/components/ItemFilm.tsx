import React, {FC, useState} from 'react';
import {IFilm} from "../models/IFilm";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addFavoriteFilm, checkCurrentUser} from "../store/reducers/UserSlice";
import blackHeart from '../img/blackHeart.png'
import redHeart from '../img/redHeart.png'
import missingImage from '../img/missingImage.png'

interface FilmItemProps {
    film: IFilm
}
const ItemFilm: FC <FilmItemProps> = ({film}) => {

    const dispatch = useAppDispatch()
    const {currentUser} = useAppSelector(state => state.userReducer)
    const [favorite, setFavorite] = useState(currentUser?.favoriteFilms.find(item => item.name === film.name))
    const navigate = useNavigate()

    const handleAddFavoriteFilm = (film) => {
        if (!currentUser) {
            navigate('/signup')
        } else {
            dispatch(addFavoriteFilm(film))
            dispatch(checkCurrentUser())
            // @ts-ignore
            setFavorite(prevState => !prevState)
        }
    }

    return (
        <div className="card col-md-4 mb-4" style={{width: 300, padding: 1}}>
            <img alt='poster' className='card-img-top' src={film.poster?.url ? film.poster?.url : missingImage}/>
            <div className='card-body d-flex flex-column justify-content-between'>
                <h2 className='card-title'>{film.name}</h2>
                <h5>{film.shortDescription ? film.shortDescription : <h5>Описание отсутствует</h5>}</h5>
                <div className='d-flex justify-content-between mt-auto'>
                    <Link className='btn btn-primary' to={`/film/${film.id}`}>Подробнее</Link>
                    <img
                        alt='Like'
                        style={{cursor: "pointer"}}
                        width={35} height={30}
                        src={!favorite ? blackHeart : redHeart}
                        onClick={() => handleAddFavoriteFilm(film)}/>
                </div>
            </div>
        </div>
    );
};

export default ItemFilm;