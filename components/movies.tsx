import Image from "next/image";
import Link from "next/link";
interface movie { 
    title: string,
     poster_path: string,
      id: number, 
      backdrop_path: string,
       overview: string,
        vote_average: number }
const movies = async ({ title, type }: { title: string, type: string }) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=0fefc9e3aaf2843acd19108415c44ebd`);
    const data = await res.json();
    const movies = data.results;
    console.log(movies[1])
    return (
        <div>
            <div className="grid">
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">{title}</h2>

                        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {movies.map((product: movie) => (
                                <div key={product.id} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={'https://image.tmdb.org/t/p/original' + product.poster_path}
                                            alt={product.title}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <Link href={
                                                    {
                                                        pathname: 'movie/' + product.id.toString(),
                                                        query: {
                                                            title: product.title,
                                                            poster: product.backdrop_path,
                                                            overview: product.overview,
                                                            rating: product.vote_average
                                                        }
                                                    }
                                                }>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">anything</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">price</p>
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