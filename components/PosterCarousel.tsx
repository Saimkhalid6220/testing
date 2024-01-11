import BgPoster from "./bg-poster"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
const PosterCarousel = () => {
  return (
    <Carousel className="">
        <CarouselContent>
        <CarouselItem>
        <BgPoster poster_path='/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'/>
        </CarouselItem>
        <CarouselItem>
        <BgPoster poster_path='/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'/>
        </CarouselItem>
        <CarouselItem>
        <BgPoster poster_path='/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'/>
    </CarouselItem>
        </CarouselContent>
        {/* <CarouselNext />
        <CarouselPrevious /> */}
    </Carousel>
  )
}

export default PosterCarousel
