import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const avatar = ({img}:{img:string}) => {
  return (
    <Avatar>
  <AvatarImage src={img} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

  )
}

export default avatar