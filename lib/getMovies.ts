import {  searchMovies } from "@/typings";

export const getPopularMovies= async(type:string) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}?api_key=0fefc9e3aaf2843acd19108415c44ebd`);
    const data = await res.json();
    const movies:searchMovies[] = data.results;
    return movies;
}
export const getSearchedMovies = async (type:string,searchItem:string) => {
    const url:URL = new URL(`https://api.themoviedb.org/3/${type}?api_key=0fefc9e3aaf2843acd19108415c44ebd&query=${searchItem}`);
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    const movies:searchMovies[]  = data.results;
    return movies;
}
export const getPictures = (poster_path:string,backdrop_path:string) => {
    if(poster_path && poster_path.includes('j')){
        return `https://image.tmdb.org/t/p/original${poster_path}`
    
    }
        return `https://image.tmdb.org/t/p/original${backdrop_path}` 
}   