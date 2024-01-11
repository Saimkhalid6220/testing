'use server'
import { getSearchedMovies } from "@/lib/getMovies"
const SearchSuggestions = async () => {
    const searchedMovies = await getSearchedMovies('search/multi' ,'a')
  return (
    <div className="bg-slate-100 max-w-2xl md:max-w-3xl w-full rounded text-center mt-2">

        {/* <p>search suggestions {searchedMovies.title}</p> */}
    </div>
  )
}

export default SearchSuggestions