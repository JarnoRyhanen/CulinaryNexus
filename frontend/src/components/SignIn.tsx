import { useState } from "react";
import herobanner from "../assets/herobanner.jpg";
import logo from "../assets/logo.png";
import Button from './Button';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const SignIn = () => {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const authContext = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSignUp = async () => {
    try {
      if (!user.username || !user.email || !user.password) {
        setError("Please fill in all fields.");
        return;
      }

      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          email: user.email,
        }),
      });
      console.log(response);
      

      response.json().then((promise) => {
        console.log(promise);
        
        localStorage.setItem("token", promise.token)
        authContext?.login();
        navigate("/home");
      });

    } catch (error) {
      console.error("Signup failed: ", error);
      setError(error as string);

    }
  }

  return (
    <div className='relative'>
      <img src={herobanner}
        width={screen.width}
        height={screen.height}
        alt='background'
        className='rounded-b-2xl object-cover h-[50rem] md:h-[60rem] md:object-cover  z-1'
      />

      <div className='absolute md:-top-32 inset-0 flex items-center justify-center z-10'>
        <div className='opacity-[97%] p-4 bg-white rounded-2xl        
        md:w-8/12 md:h-[70%] 2xl:w-8/12 2xl:h-[70%]
        
        flex justify-center border-2 border-black/75'>

          <div className="flex flex-col items-center">
            <div className='flex flex-col pb-4 gap-4 items-center md:w-full border-b-2 border-black'>
              <img src={logo} alt='logo' className="w-[2.5rem] h-[2.5rem] md:w-[10rem] md:h-[10rem]" />
              <h1 className='m-auto pl-4 font-bold font-sans text-xs md:text-3xl text-orange-900 md:w-[30rem]'>Sign in to join CulinaryNexus</h1>
            </div>

            {error && <p className="text-red-500 p-1 -mb-12 font-sans font-semibold items-center">{error}</p>}
            <div className='flex flex-col pb-1 md:pb-4 gap-4 items-center md:items-start md:w-full border-b-2 border-black'>

              <input
                type='text'
                placeholder='Username'
                name="username"
                onChange={handleChange}
                value={user.username}
                className='relative mt-6 md:mt-16 font-medium font-sans text-black placeholder:text-black/50 bg-transparent/5 
                  border-2 text-xs md:text-2xl w-[10rem] md:w-[30rem] p-2 rounded'
              />

              <input
                type='email'
                placeholder='Email'
                name="email"
                onChange={handleChange}
                value={user.email}
                className='relative mt-6 md:mt-16 font-medium font-sans text-black placeholder:text-black/50 bg-transparent/5 
                  border-2 text-xs md:text-2xl w-[10rem] md:w-[30rem] p-2 rounded'
              />

              <input
                type='password'
                placeholder='password'
                name="password"
                value={user.password}
                onChange={handleChange}
                className='relative mt-6 md:mt-16 font-medium font-sans text-black placeholder:text-black/50 bg-transparent/5 
                  border-2 text-xs md:text-2xl w-[10rem] md:w-[30rem] p-2 rounded'
              />

            </div>
            <Button className="mt-3 md:mt-6" onClick={handleSignUp}>
              Sign in!
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;