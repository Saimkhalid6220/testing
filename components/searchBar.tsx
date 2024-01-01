import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="flex w-full max-w-3xl items-center space-x-2 ">
      <Input type="email" placeholder="Search movies here" />
      <Button type="submit" className="bg-red-500"><Search/></Button>
    </div>
  )
}
