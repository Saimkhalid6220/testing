'use client'
import { AlertTriangle, User } from "lucide-react"
import { ArrowDownToLine } from "lucide-react"
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Link from "next/link";

interface MovieLink {
  full_name: string;
  download_link: string;
}

const DownloadButton = (params:any) => {
  const [Movie, setMovie] = useState<MovieLink | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/apis/GetData?id=${params.l_id}&media_type=${params.media_type}`);
        const result = await response.json();

        if (response.ok) {
          // console.log(result.data[0])
          setMovie(result.data[0]);
          // console.log("its working i guess")
          setError(null);
        } else {
          setMovie(null);
          setError(result.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMovie(null);
        setError('An error occurred. Please try again.');
      }
    };

    if (params.l_id) {
      fetchUser();
    }
  },[params.l_id]);
    const downloadFile = async (dlink:string) => {
      // dlink = dlink.split('/d/')[1]?.split('/')[0]
      try {
        const response = await fetch("/apis/getFile",{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({fileLink:dlink})
        });
        if (!response.ok) {
          throw new Error(`Failed to download file, status ${response.status}`);
        }
  
        // const blob = await response.blob();
        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = dlink;
        // document.body.appendChild(a);
        // a.click();
        // a.remove();
      } catch (error) {
        console.error('Error downloading file:', error);
        // Handle error (e.g., show error message to user)
      }
    
    };
    if(params.media_type == 'tv' && Movie){
      Movie.download_link = params.series_Link
      // console.log(Movie.download_link)
    }
  return (
        <>
      {error && <p className="text-black dark:text-white text-center"> {error}</p>}
      {Movie ? (

        
        <div className="m-4 text-center p-4 dark:bg-slate-900 bg-slate-200 dark:border dark:rounded-md dark:border-slate-100 flex justify-center items-center flex-col space-y-2">
        <h3 className="capitalize text-black dark:text-white">Download your movie</h3>
        <p className="text-yellow-500 text-sm capitalize flex  items-center"><AlertTriangle className="text-sm mx-1"/>NOTE: the download link may redirect you to other page to download movies sucessfully </p>
        {window.location.pathname == `/movie/${params.l_id}/download` || params.media_type == 'movie' ?(  
          
          <button onClick={(e) => downloadFile(Movie.download_link)} className="dark:bg-black dark:border dark:border-slate-200 bg-slate-900 text-white py-2 px-4 rounded-md capitalize my-4 flex items-center">Download <ArrowDownToLine className="mx-1"/></button>
          ):(

            <Link href={{pathname:`/movie/${params.l_id}/download`,query:{id:params.l_id,media_type:params.media_type}}} className="dark:bg-black dark:border dark:border-slate-200 bg-slate-900 text-white py-2 px-4 rounded-md capitalize my-4 flex items-center">Go TO Download <ArrowDownToLine className="mx-1"/></Link>
            ) 
        }
    </div>
         ):<Loading/>
    } 
        </>
  )
}

export default DownloadButton
