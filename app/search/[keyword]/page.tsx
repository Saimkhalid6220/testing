import { getSearchedMovies } from "@/lib/getMovies";
import Movie from '@/components/movies'
import { error } from "console";
const SearchPage = async ({searchParams:{keyword}}:{searchParams: {
    keyword: string;
}}) => {
  try{

    const searchResultls = await getSearchedMovies('search/multi',keyword);
    console.log(searchResultls)
    return (
      <Movie title="Your Search Results" movies={searchResultls}/>
    )
  }
  catch{
    console.error(error)
  }
 
}

export default SearchPage
