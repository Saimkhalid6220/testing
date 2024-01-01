import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Avatar from "@/components/avatar"
import { UserIcon } from "lucide-react"



const header = async () => {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession();
    // console.log(session?.user.user_metadata)
    return (
        <nav className="shadow flex justify-between items-center p-4 px-8 overflow-hidden bg-red-500">
            <div className=""><Link href={'/'}><h1 className="sm:text-3xl text-lg mr-2 text-white font-bold">MovieTube</h1></Link></div>
            <div className="flex items-center space-x-8">
                {session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {session?.user.user_metadata.avatar_url ? (
                                <Avatar img={session?.user.user_metadata.avatar_url} />
                            ) : (
                                <UserIcon />
                            )

                            }
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <form action="https://movietube.vercel.app/auth/signout" method="POST">
                                    <button type="submit" >SignOut</button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                ) : (

                    <Link prefetch={false} href={'/signup'} className="bg-red-500 py-2 px-4 rounded text-white">SignIn</Link>
                )
                }
            </div>
        </nav>
    )
}

export default header
