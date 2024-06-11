import supabase from "@/lib/config";
import { getPopularMovies } from "@/lib/getMovies";
import { searchMovies } from "@/typings";

export const getById = async (id:string | undefined) => {
    const {data}:{data:{movie:searchMovies[]}[] |null} = await supabase.from('watchlist').select('movie').eq('userNo',id)
    const movie = data;
        return movie
} 
export const updateMovie = async (prevdata:searchMovies[] ,movie:searchMovies,id:string |undefined) => {
  const updatedData = prevdata.push(movie)
 const {data,error} = await supabase.from('watchlist').update([{
      "movie": prevdata
    }]).eq('userNo',id);
}
export const addMovie = async (movie:searchMovies,id:string |undefined) => {
 const {data,error} = await supabase.from('watchlist').insert([{
      "movie":[movie],
      "userNo":id
    }])
}
export const deleteMovie = async (movie:searchMovies, id:string |undefined) => {
  // const {data,error} = await supabase.from('watchlist').delete().eq('userNo', id).eq('movie', movie)
  console.log(movie)
  // return data;
}
