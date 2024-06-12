'use client'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { searchMovies } from "@/typings"
import { Button } from "./ui/button"

export function SearchBar({ searchMovies }: { searchMovies: searchMovies[] }) {
  var hahah = "hoahaha"
  const [input, setInput] = useState("")
  const [results ,setResults] = useState<searchMovies[]>([{
    adult:false,
    backdrop_path:"",
    first_air_date:"",
    genre_ids:[0],
    id:0,
    media_type:"",
    name:"",
    origin_country:[""],
    original_language:"",
    original_name:"",
    overview:"",
    popularity:0,
    poster_path:"",
    vote_average:0,
    vote_count:0,
    l_id:"",

  }]);
  const getDesiredResult = (searchInput:string) => {
    // console.log(searchInput);
    const results = searchMovies.filter((item) => {
      return item && item.name && item.name.toLowerCase().includes(searchInput)
    })
    // console.log(searchMovies)
    // console.log(results)
    setResults(results)
  }
  const handleInput = (value:string) => {
    setInput(value);
    getDesiredResult(value)
  }
  return (
    <div className="w-full max-w-3xl flex flex-col ">
      <div className="flex items-center space-x-2 ">
        <form action={`/search/${input}`} className="flex items-center space-x-2 w-full">
        <Input className="border dark:border-white border-black" type="search" placeholder="Search movies here" value={input} onChange={(e) => {handleInput(e.target.value)}} />
        {input ?(
        <Button type="submit" className="bg-slate-900 border p-2 rounded">
          <Search className="text-white"/></Button>

        ):(
        <Button type="button" className="bg-slate-300 p-2 rounded cursor-not-allowed hover:bg-slate-200">
          <Search className="text-white"/></Button>
        )}
        </form>
        </div>
        { input !== ""?(

          <div className=" flex flex-col bg-slate-100 max-w-2xl md:max-w-3xl w-full rounded  mt-2 text-sm space-y-2">

          {results.map((movie)=>(
            <Link href={'/'} className="ms-4 border-b-2 pb-2 border-b-black dark:text-black" key={movie.id}>{movie.name}</Link>
          ))}
        </div>
        ):("")
        }
        
      </div>

  )
}
