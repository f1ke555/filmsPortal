import React, {FC, useState} from 'react';
import {IFilm} from "../models/IFilm";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addFavoriteFilm, checkCurrentUser} from "../store/reducers/UserSlice";
import blackHeart from '../img/blackHeart.png'
import redHeart from '../img/redHeart.png'

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
        <div className="card col" style={{width: 300, padding: 1}}>
            <img className='card-img-top' src={film.poster.url}/>
            <div className='card-body'>
                <h2 className='card-title'>{film.name}</h2>
                <h5>{film.shortDescription}</h5>
                <div className='d-flex justify-content-between'>
                    <Link className='btn btn-primary' to={`/film/${film.id}`}>Подробнее</Link>
                    <img style={{cursor: "pointer"}} width={35} height={30} src={!favorite ? blackHeart : redHeart}
                         onClick={() => handleAddFavoriteFilm(film)}/>
                </div>
            </div>
        </div>

    );
};

export default ItemFilm;