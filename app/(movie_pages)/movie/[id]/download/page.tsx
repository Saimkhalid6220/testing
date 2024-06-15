'use client'
import React, { useEffect, useState } from 'react';
import DownloadButton from '@/components/DownloadButton';

const DownloadPage = ({searchParams}:{searchParams:{id:string,media_type:string}}) => {
  const index = 1
  const [Movie, setMovie] = useState<any>('');
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/apis/GetData?id=${searchParams.id}&media_type=${searchParams.media_type}`);
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

    if (searchParams.id) {
      fetchUser();
    }
  });
    return(
    <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-8">
        TV Show Seasons
      </h1>
      <span>{ JSON.stringify(Movie.season_1)}here it is</span>
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