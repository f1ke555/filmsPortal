import {IFilm} from "./models/IFilm";
import {IFilters} from "./models/IFilters";

export interface Values {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    favoriteFilms: IFilm[],
    historySearch: IFilters[],
}

export const initialFormikValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    favoriteFilms: [],
    historySearch: [],
}