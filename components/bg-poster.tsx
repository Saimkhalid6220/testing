import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

const BgPoster = ({poster_path}:{poster_path:string}) => {
  return (
    <div className="overflow-hidden relative -z-10 md:h-96 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)]">
  <AspectRatio ratio={16 / 9} className="">
    <Image src={'https://image.tmdb.org/t/p/original'+poster_path} alt="Image" className="mix-blend-overlay  object-center w-[100vw] md:h-96" width={1920} height={1080} />
  </AspectRatio>
</div>

  )
}

export default BgPoster