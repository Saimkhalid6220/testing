
import Movies from '@/components/movies'
import CarousalPoster from '@/components/carousalPoster';
import { getPopularMovies, getGenres } from '@/lib/getMovies';
import { searchMovies } from '@/typings';

 async function  Home() {
  const popularMovies = await getPopularMovies('movie/popular')
  const popularTv = await getPopularMovies('tv/popular')
  const Genres = await getGenres();
//   const searchMovies = await getSearchedMovies('search/multi','a');
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
