
export interface Props {
    title: string,
    movies: searchMovies[]
}
export interface Genres {
    id: number,
    name: string
}
export interface searchMovies {
    adult:false,
    backdrop_path:string,
    first_air_date:string,
    genre_ids:Array<number> ,
    id:string,
    media_type:string,
    name:string,
    origin_country:string[],
    original_language:string,
    original_name:string,
    overview:string,
    popularity:number,
    poster_path:string,
    vote_average:number,
    vote_count:number,
    title?:string | null,
    known_for?:any,
    l_id:string;





}
// export interface Database {

//         data:{

//         }
//     }
