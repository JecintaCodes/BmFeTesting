import { Link, useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import { signInBuyer } from "../../api/BuyerApi"
// import { useSelector} from "react-redux"
import { useState } from "react"
import { loginBuyer } from "../../components/global/redux"
// import {UserHistory} from "react-router-dom"


const SignIn = () => {

  // let buyerData = useSelector((state: any) => state?.myUser);
  const [loading,setLoading] = useState<boolean>(false)

  const navigate = useNavigate();


  const schema = yup.object({
    email:yup.string().required(),
    password:yup.string().required(),
  })

  const {register, handleSubmit,reset} = useForm({
    resolver:yupResolver(schema)
  })

  const onHandleSubmission = handleSubmit(async(data:any)=>{
    setLoading(true);
const {email, password} = data
console.log("handle submit", {email, password})
    signInBuyer({email, password}).then((res:any)=>{
      loginBuyer(res)
      reset();
      navigate("/store")
    })
  
  })
  console.log(loading)
// console.log(buyerData)
// console(loading)
  return (
    <form 
    onSubmit={onHandleSubmission}
    className="w-[100%] h-[100vh] flex justify-center items-center"
    style={{
      background:"rgba(179, 184, 231, 0.25)",
      boxShadow:" 0 8px 32px 0 rgba( 31, 38, 135, 0.37  )",
      backdropFilter:"blur( 4px )",
      WebkitBackdropFilter:" blur( 4px )",
    }}
    >
        <div className="w-[350px] small:w-[70%] mobile:w-[70%] p-[20px]  overflow-hidden rounded bg-[white] min-h-[300px]  ">
            <div className="text-center font-semibold text-[16px] text-[#b5b1b1] ">Sign In Buyer</div>
          
          <div>
          <input 
            className="w-[100%] h-[50px] mt-[20px] rounded p-[10px] outline-none placeholder:text-[12px] placeholder:text-[#d1cdcd] bg-transparent border-[2px] text-[12px] "
            type="email" placeholder="Jecinta@gmail.com  " {...register("email")} />
            {/* {errors?.email && <div className="text-[red] font-bold text-[10px] ">error</div>} */}
           
          </div>
            <input 
            className="w-[100%] h-[50px] mt-[20px] rounded p-[10px] outline-none placeholder:text-[12px] placeholder:text-[#d1cdcd] bg-transparent border-[2px] text-[12px] "
            type="password" placeholder="Jecinta@gmail.com   " {...register("password")} />
           
            <button className="w-[100%] h-[50px] mt-[20px] rounded p-[10px]   hover:cursor-pointer hover:scale-[1.05] transition-all duration-500 "
            type="submit"
            style={{
              background:"rgba(179, 184, 231, 0.25)",
              boxShadow:" 0 8px 32px 0 rgba( 31, 38, 135, 0.37  )",
              backdropFilter:"blur( 4px )",
              WebkitBackdropFilter:" blur( 4px )",
            }}
            >Sign In</button>
            <div className="w-[100%] h-[50px] mt-[20px] flex justify-center gap-2 text-[12px] ">
                <div>Don't have an account?</div>
                <Link to="/sign-up">
                <div>Sign up</div>
                </Link>
            </div>

        </div>
    </form>
  )
}

export default SignIn