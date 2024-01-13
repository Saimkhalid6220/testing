import { getPictures } from "@/lib/getMovies";
import { Props, searchMovies } from "@/typings";
import Image from "next/image";
import Link from "next/link";
const movies =({ title, movies }: Props) => {
    console.log("hello world")
    // console.log(movies)
for(let i = 0; i<movies.length; i++){
    if(movies[i].known_for  || !movies[i].backdrop_path){
        delete movies[i];
    }
}
    return (
        <div >
            <div>
                <div className="bg-white dark:bg-black">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">{title}</h2>

                        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                            { movies.map((product: searchMovies) => (
                                <div key={product.id} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={getPictures(product.poster_path,product.backdrop_path)}
                                            alt="movie picture"
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-500">
                                                <Link className="font-bold" href={
                                                    {
                                                        pathname: '/movie/' + product.id.toString(),
                                                        query: {
                                                            title: product.title?product.title:product.name,
                                                            poster: product.backdrop_path,
                                                            overview: product.overview,
                                                            rating: product.vote_average
                                                        }
                                                    }
                                                }>
                                                    <span aria-hidden="true" className="absolute inset-0 " />
                                                    {product.title?product.title:product.name}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{product.overview && product.overview.substring(0,200)}..</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default movies