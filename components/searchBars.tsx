import { getSearchedMovies } from "@/lib/getMovies";
import { SearchBar } from "./searchBar";

const searchBars = async() => {

    const searchMovies = await getSearchedMovies('search/multi','a');
  return (
    <div className=" flex justify-center my-4 px-2">

        <SearchBar searchMovies = {searchMovies}/>
    </div>
  )
}

export default searchBars