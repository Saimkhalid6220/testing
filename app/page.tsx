
import { SearchBar } from '@/components/searchBar';
import Movies from '@/components/movies'
import CarousalPoster from '@/components/carousalPoster';
import { getPopularMovies, getSearchedMovies } from '@/lib/getMovies';

 async function  Home() {
  const popularMovies = await getPopularMovies('movie/popular')
  const popularTv = await getPopularMovies('tv/popular')
//   const searchMovies = await getSearchedMovies('search/multi','a');
  return (
   <main>
      <CarousalPoster movie = {popularMovies}/>
       <div className='flex justify-center p-4'>
    {/* <SearchBar searchMovies = {searchMovies}/> */}
    </div>
    <Movies title = 'popular movies'     movies = {popularMovies}/>
    <Movies title = 'popular tv series'  movies ={popularTv}/>
   </main>
  )
}
export default Home;
