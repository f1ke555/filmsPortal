export interface IFilm {
    id: number,
    name: string,
    poster: any,
    description: string,
    movieLength: number,
    year: number,
    genres: genre[],
    rating: any,
    ageRating: number;
    countries: [],
    shortDescription: string,
}

interface genre {
    name: 'string'
}