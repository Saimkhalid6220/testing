import { getSearchedMovies } from "@/lib/getMovies";
import Movie from '@/components/movies'
import { error } from "console";
const SearchPage = async (props:any) => {
  console.log(props.params.keyword)
  try{
    const searchResultls = await getSearchedMovies('search/multi',props.params.keyword);
    // console.log(searchResultls)
    return (
      <>
      <h1>{props.params.keyword}</h1>
      <Movie title="Your Search Results" movies={searchResultls}/>
      </>
    )
  }
  catch{
    console.error(error)
  }
 
}

export default SearchPage
