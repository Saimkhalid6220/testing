import { AlertTriangle } from "lucide-react"
import { ArrowDownToLine } from "lucide-react"

const DownloadButton = () => {
  return (
    <div className="m-4 text-center p-4 dark:bg-slate-900 bg-slate-200 dark:border dark:rounded-md dark:border-slate-100 flex justify-center items-center flex-col space-y-2">
        <h3 className="capitalize text-black dark:text-white">Download your movie</h3>
        <p className="text-yellow-500 text-sm capitalize flex  items-center"><AlertTriangle className="text-sm mx-1"/>NOTE: the download link may redirect you to other website to download movies sucessfully </p>
        <button className="dark:bg-black dark:border dark:border-slate-200 bg-slate-900 text-white py-2 px-4 rounded-md capitalize my-4 flex items-center">Download <ArrowDownToLine className="mx-1"/></button>
    </div>
  )
}

export default DownloadButton