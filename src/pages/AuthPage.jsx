import React, {useState} from 'react'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='bg-[#F7F7F7] w-[100%] h-screen flex flex-col justify-center items-center text-[#333333]'>
      <div className='flex'>
        <img
                src="/flowtrack-logo.png"
                alt="logo"
                className="w-[50px] h-[50px]"
              />
        <h2 className='text-3xl font-bold mb-5'>FlowTrack</h2>
      </div>

      <div className='bg-white w-[30%] h-auto flex flex-col justify-center items-center rounded-2xl'>
        <div className='w-[70%] font-semibold relative flex h-9 mb-6 border-gray-300 rounded-md overflow-hidden bg-[#F7F7F7] mt-5'>
          <button onClick={() => {
            setIsLogin(true)
          }} className={`w-1/2 font-semibold transition-all z-10 ${isLogin ? "text-[#4ECDC4]" : "text-black"}`}>Login</button>
          <button onClick={() => {
            setIsLogin(false)
          }} className={`w-1/2 font-semibold transition-all z-10 ${!isLogin ? "text-[#4ECDC4]" : "text-black"}`}>Register</button>
          <div className={`absolute top-0 h-full w-1/2 shadow-lg rounded-md bg-white border-[#F7F7F7] ${isLogin ? "left-0" : "left-1/2"}`}></div>
        </div>

        <h4 className='text-[20px] font-semibold'>{isLogin ? "Login to Your Account" : "Create Your Account"}</h4>
        <form className='flex flex-col m-3'>
          {/* shared input field */}
          <label className='text-[14px] font-semibold'>Email</label>
          <input className='border border-[gainsboro] focus:outline-[#4ECDC4] py-1 rounded-md placeholder:text-[14px]' type="email" placeholder='Enter your email' required/>

          <label className='text-[14px] font-semibold mt-5'>Password</label>
          <input className='border border-[gainsboro] focus:outline-[#4ECDC4] py-1 rounded-md placeholder:text-[14px]' type="password" placeholder='Enter your password' required/>

          {/* for register only */}
          {!isLogin && (
            <><label className='text-[14px] font-semibold mt-5'>Confirm Password</label><input className=' border border-[gainsboro] focus:outline-[#4ECDC4] py-1 rounded-md placeholder:text-[14px]' type="password" placeholder='Confirm your password' required /></>
          )}

          {/* forget password for login */}
          {isLogin && (
            <div>
              <p className='flex justify-end text-[14px] font-semibold text-[#4ECDC4] hover:text-[#3C9D97] mt-2'>Forgot password?</p>
            </div>
          )}

          {/* shared input */}
          <button className='bg-[#4ECDC4] mt-5 py-2 text-white rounded-md hover:bg-[#3C9D97]'>
            {isLogin ? "Login" : "Register"}
          </button>

          {/* switch link */}
          <p className='mt-3'>{isLogin ? "Don't have an account?" : "Already have an account?"}
            <a href="#" onClick={(e) => setIsLogin(!isLogin)} className='text-[#4ECDC4] hover:text-[#3C9D97]'>{isLogin ? "Register" : "Login"}</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AuthPage