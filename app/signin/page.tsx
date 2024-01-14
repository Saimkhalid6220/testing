import AuthForm from "@/components/auth-form"

const Signin = () => {
  return (
    <div className="h-96 flex justify-center items-center ">
        <div className="md:w-[40%] max-w-3xl">
        <AuthForm view = 'sign_in'/>
        </div>
        </div>
  )
}

export default Signin