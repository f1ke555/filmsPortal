import {IFilm} from "./IFilm";
import {IFilters} from "./IFilters";

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
    favoriteFilms: IFilm[],
    historySearch: IFilters[],
}