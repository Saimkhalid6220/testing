
import { SearchBar } from '@/components/searchBar';
import Movies from '@/components/movies'
import CarousalPoster from '@/components/carousalPoster';
import { getPopularMovies } from '@/lib/getMovies';

 async function Home() {
  const popularMovies =  getPopularMovies('movie')
  const popularTv =  getPopularMovies('tv')
  return (
   <main>
      <CarousalPoster movie = {await popularMovies}/>
       <div className='flex justify-center p-4'>
    <SearchBar/>
    </div>
    <Movies title = 'popular movies'  movies = {popularMovies}/>
    <Movies title = 'popular tv series'  movies ={popularTv}/>
   </main>
  )
}
export default Home;
