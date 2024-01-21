'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay";
import BgPoster from "./bg-poster"
import { Genres, searchMovies } from "@/typings";
const carousalPoster =  ({movie,genres}:{movie:searchMovies[],genres:Genres[]}) => {
    const forPoster = movie.slice(0,3)
  return (
    <div>

    <Carousel className="" 
    plugins={[
        Autoplay({
          delay: 8000,
        }),
      ]}
    >
  <CarouselContent>
    {forPoster.map((item:searchMovies) => (
<>
    <CarouselItem >
        <BgPoster poster_path={item.backdrop_path}/>
        <div  className='absolute  flex flex-col justify-end items-start z-10 top-0 text-white text-bold h-full w-full'>
                <div key={item.id} className='max-w-3xl ml-8 space-y-2  px-2 py-4'>
                    <h2 className='text-2xl md:text-4xl'>{item.title}</h2>
                    <p className=' text-sm hidden md:block'>{item.overview}</p>
                    <p className="text-sm text-white flex space-x-2">
                      {
                        item.genre_ids.map((id:number,index:number) =>(
                          <span key={index}>{genres && genres.find((genre:Genres)=>genre.id===id)?.name}</span>
                        ))
                      }
                    </p>
                    <p className="text-sm text-white">IMDB : {item.vote_average && item.vote_average.toFixed(1)}</p>
                </div>            
        </div>
        </CarouselItem>
</>
    ))}
  </CarouselContent>
  {/* <CarouselPrevious /> */}
  {/* <CarouselNext /> */}
</Carousel> 
</div>

  )
}

export default carousalPoster