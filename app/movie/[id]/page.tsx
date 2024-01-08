import BgPoster from '@/components/bg-poster'
import React from 'react'
interface movie { 
    title: string,
     poster: string, 
       overview: string,
        rating: number }
const MoviePage =async  ({searchParams}:{searchParams:movie}) => {
    // console.log(props)
  return (
    <section >
    <div className='relative '>
        <BgPoster poster_path={searchParams.poster}/>
        <div className='absolute flex flex-col justify-center items-start z-10 top-0 text-white text-bold h-full w-full'>
                <div className='max-w-3xl ml-8 space-y-2 p-2 hidden sm:block'>
                    <h2 className='text-2xl md:text-xl'>{searchParams.title}</h2>
                    <p className=' text-sm'>{searchParams.overview}</p>
                </div>            
        </div>
    </div>
    <div className='relative bottom-1 p-4  shadow-lg space-y-4 w-full bg-slate-800 bg-gradient-to-b from-[rgba(192,188,188,0.38)] text-white'>
        <span className='text-4xl font-bold'>overview</span>
        <p className='text-start'>{searchParams.overview}</p>
    </div>
    </section>
  )
}

export default MoviePage