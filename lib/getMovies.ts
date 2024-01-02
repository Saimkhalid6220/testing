interface movie { 
    title: string,
     poster_path: string,
      id: number, 
      backdrop_path: string,
       overview: string,
        vote_average: number }
export const getPopularMovies= async(type:string) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=0fefc9e3aaf2843acd19108415c44ebd`);
    const data = await res.json();
    const movies:movie[] = data.results;
    return movies;
}
export const getCarousalImages= () => {
    
}