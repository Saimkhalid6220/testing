import { getSearchedMovies } from "@/lib/getMovies";
import Movie from '@/components/movies'
const SearchPage = async ({searchParams:{keyword}}:{searchParams: {
    keyword: any;
}}) => {
    const searchResultls = await getSearchedMovies('search/multi',keyword)
  return (
    <Movie title="Your Search Results" movies={searchResultls}/>
  )
}

export default SearchPage