'use client'
import { AlertTriangle, User } from "lucide-react"
import { ArrowDownToLine } from "lucide-react"
import { useEffect, useState } from "react";
import Loading from "./Loading";

interface MovieLink {
  full_name: string;
  download_link: string;
}

const DownloadButton = ({l_id}:{l_id:string}) => {
  const [Movie, setMovie] = useState<MovieLink | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/apis/GetData?id=${l_id}`);
        console.log("not a shit"+ response)
        const result = await response.json();

        if (response.ok) {
          console.log(result)
          setMovie(result.data[0]);
          console.log("its working i guess")
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

    if (l_id) {
      fetchUser();
    }
  },[l_id]);
  console.log("this is some shit"+l_id)
    const downloadFile = (dlink:string) => {
      const link = document.createElement('a');
      link.href = `https://drive.google.com/uc?export=download&id=${dlink}`;
      link.setAttribute('download', 'file');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  return (
        <>
        <p className="p-2 bg-red-500 text-black">this is id : {l_id}</p>
      {error && <p className="text-black dark:text-white text-center"> {error}</p>}
      <div className="text-center">Movie Links</div>
      {Movie ? (

        
        <div className="m-4 text-center p-4 dark:bg-slate-900 bg-slate-200 dark:border dark:rounded-md dark:border-slate-100 flex justify-center items-center flex-col space-y-2">
        <h3 className="capitalize text-black dark:text-white">Download your movie</h3>
        <p className="text-yellow-500 text-sm capitalize flex  items-center"><AlertTriangle className="text-sm mx-1"/>NOTE: the download link may redirect you to other website to download movies sucessfully </p>
        <button onClick={(e) => downloadFile(Movie.download_link)} className="dark:bg-black dark:border dark:border-slate-200 bg-slate-900 text-white py-2 px-4 rounded-md capitalize my-4 flex items-center">Download <ArrowDownToLine className="mx-1"/></button>
    </div>
        ):<Loading/>
    }
        </>
  )
}

export default DownloadButton