
import Movies from '@/components/movies'
import CarousalPoster from '@/components/carousalPoster';
import { getPopularMovies, getGenres } from '@/lib/getMovies';
import supabase from '@/lib/config';
import movies from '@/components/movies';
import { PostgrestSingleResponse } from '@supabase/postgrest-js/dist/module/types';
import { addMovie, getById } from '../signin/helperfunctions/getData/dataFunctions';
 async function  Home() {
  const popularMovies = await getPopularMovies('movie/popular')
  const popularTv = await getPopularMovies('tv/popular')
  const Genres = await getGenres(); 


  //   const searchMovies = await getSearchedMovies('search/multi','a');
  // const {data:movie}
  //   = await supabase.from('watchlist').select('movie').eq('id',5)
//   const getdata = await getById();
//   if(!getdata)return
//  console.log(getdata[0].movie)
  // console.log(mov.movie.json())
  // const insertdata = await addMovie(getdata[0].movie)

  return (
   <main>
      <CarousalPoster movie = {popularMovies} genres = {Genres}/>
       <div className='flex justify-center p-4'>
    {/* <SearchBar searchMovies = {searchMovies}/> */}
    </div>
    <Movies title = 'popular movies'     movies = {popularMovies}/>
    <Movies title = 'popular tv series'  movies ={popularTv}/>
   </main>
  )
}
export default Home;
