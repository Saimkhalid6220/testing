import { getSearchedMovies } from "@/lib/getMovies";
import Movie from '@/components/movies'
import { error } from "console";
const SearchPage = async (props:any) => {
    const searchResultls = await getSearchedMovies('search/multi',props.params.keyword);
    // console.log(searchResultls)
    return (
      <Movie title="Your Search Results" movies={searchResultls}/>
    )
 
}

export default SearchPage
