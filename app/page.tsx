import Image from 'next/image'
import { SearchBar } from '@/components/searchBar';
import Movies from '@/components/movies'
export default function Home() {
  return (
   <main>
       <div className='flex justify-center p-4'>
    <SearchBar/>
    </div>
    <Movies title = 'popular movies' type = 'movie'/>
    <Movies title = 'popular tv series' type = 'tv'/>
   </main>
  )
}
