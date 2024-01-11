import {IFilm} from "./IFilm";

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
    favoriteFilms: IFilm[],
}