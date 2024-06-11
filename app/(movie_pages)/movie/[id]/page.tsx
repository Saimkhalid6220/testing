import DownloadButton from '@/components/DownloadButton'
import BgPoster from '@/components/bg-poster'
import { getGenres } from '@/lib/getMovies'
import {  Genres, searchMovies } from '@/typings'
import { stringify } from 'querystring'
import React from 'react'
const MoviePage =async  ({searchParams}:{searchParams:searchMovies}) => {
  const genres = await getGenres();
  // const genreIds: number[] = searchParams.genre_ids 

  console.log(typeof searchParams.genre_ids,2)
  return (
    <section >
    <div className='relative '>
        <BgPoster poster_path={searchParams.backdrop_path}/>
        <div className='absolute flex flex-col justify-end items-start z-10 top-0 text-white text-bold h-full w-full'>
                <div className='max-w-3xl ml-8 space-y-2 px-2 py-4 sm:block'>
                    <h2 className='text-2xl md:text-xl'>{searchParams.title}</h2>
                    <p className='text-white text-sm flex space-x-2'>
                      {searchParams.genre_ids?.length > 2 && Array.isArray(searchParams.genre_ids) ? searchParams.genre_ids.map((id:number,index:number) => (
                        <span key={index}>
                          {genres && genres.find((genre:Genres) =>genre.id == id)?.name},
                        </span> 
                    )):""}
                    </p>
                    <p>
                      IMDB : {searchParams.vote_average}
                    </p>
                    <p className='hidden md:block text-sm'>{searchParams.overview}</p>
                </div>            
        </div>
    </div>
    <div className='relative bottom-1 p-4  shadow-lg space-y-4 w-full bg-slate-900 bg-gradient-to-b from-[rgba(192,188,188,0.38)] text-white'>
        <span className='text-4xl font-bold'>overview</span>
        <p className='text-start'>{searchParams.overview}</p>
    </div>
    <DownloadButton id = {(searchParams.id)?.toString()}/>
    </section>
  )
}

export default MoviePage