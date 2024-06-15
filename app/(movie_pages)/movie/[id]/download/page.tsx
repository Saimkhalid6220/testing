'use client'
import React, { useEffect, useState } from 'react';
import DownloadButton from '@/components/DownloadButton';

const DownloadPage = ({searchParams}:{searchParams:{id:string,media_type:string}}) => {
  const index = 1
  const [Movie, setMovie] = useState<any>('');
  const [error, setError] = useState<string | null>(null);
  const extractIdFromUrl = (url: string): string => {
    // Create a URL object
    const pathname = url;
  
    // Extract the pathname part of the URL
    // const pathname = parsedUrl.pathname; // "/movie/66732/download"
  
    // Split the pathname to get the ID
    const pathParts = pathname.split('/'); // ["", "movie", "66732", "download"]
    const idFromPath = pathParts[2]; // "66732"
  
    // Alternatively, extract the query parameter `id`
    // const idFromQuery = parsedUrl.searchParams.get('id'); // "66732"
  
    // Validate and return the correct id
    // if (idFromPath === idFromQuery) {
      return idFromPath;
    // } else {
      // throw new Error('The ID in the path and query parameter do not match.');
    // }
  };
  const idFromUrl = extractIdFromUrl(window.location.pathname)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/apis/GetData?id=${idFromUrl}&media_type=${searchParams.media_type}`);
        const result = await response.json();

        if (response.ok) {
          console.log(result.data[0].ep_link)
          setMovie(result.data[0].ep_link);
          console.log("its working i guess")
          setError(null);
        } else {
          // setMovie(null);
          setError(result.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // setMovie(null);
        setError('An error occurred. Please try again.');
      }
    };

    if (idFromUrl) {
      fetchUser();
    }
  },[]);

  
    return(
    <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-8">
        TV Show Seasons
      </h1>
      <span>{ JSON.stringify(Movie.season_1)}here it is {searchParams.id},{idFromUrl}</span>
      {Object.keys(Movie).map((season:string, index:number) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {season}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {Movie[season].map((episode:any, index:any) => (
                <>
              <p key={index} className="text-red-600 text-center font-bold">
                {episode.name}
              </p>
                <DownloadButton l_id = {searchParams.id} media_type = {searchParams.media_type} series_Link = {episode.link}/>
                </>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
  )
};

export default DownloadPage