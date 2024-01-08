'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay";
import BgPoster from "./bg-poster"
import { Props, searchMovies } from "@/typings";
const carousalPoster =  ({movie}:{movie:searchMovies[]}) => {
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
    {forPoster.map((item:any) => (
<>
    <CarouselItem >
        <BgPoster poster_path={item.backdrop_path}/>
        <div  className='absolute flex flex-col justify-center items-start z-10 top-0 text-white text-bold h-full w-full'>
                <div key={item.id} className='max-w-3xl ml-8 space-y-2 p-2 hidden sm:block'>
                    <h2 className='text-2xl md:text-xl'>{item.title}</h2>
                    <p className=' text-sm'>{item.overview}</p>
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