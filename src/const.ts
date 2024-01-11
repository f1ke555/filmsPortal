import {IFilm} from "./models/IFilm";

export interface Values {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    favoriteFilms: IFilm[],
}

export const initialFormikValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    favoriteFilms: []
}