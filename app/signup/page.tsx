import AuthForm from "@/components/auth-form"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signup',
}

const Signup = () => {
  return (
    <div className="h-96 flex justify-center items-center ">
        <div className="md:w-[40%] max-w-3xl">
        <AuthForm view="sign_up"/>
        </div>
        </div>
  )
}

export default Signup