import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

const Login = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
      });
      const navigate = useNavigate();
    
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value })
      }

      const handleLogin = async () => {
        try {
          const response = await axios.post("http://localhost:8080/login", {
            username: user.username,
            password: user.password
          });
          console.log("JWT Token:", response.data);
          // Save the token in localStorage or a cookie
          localStorage.setItem("token", response.data);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("email", response.data.email);
          navigate("/home");
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error("Login failed:", error.response.data);
          } else {
            console.error("Login failed:", error instanceof Error ? error.message : error);
          }
        }
      };

    return (
        <div className='flex flex-col pb-1 md:pb-4 gap-4 justify-center items-center md:items-start md:w-full border-b-2 border-black'>

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
          type='password'
          placeholder='password'
          name="password"
          value={user.password}
          onChange={handleChange}
          className='relative mt-6 md:mt-16 font-medium font-sans text-black placeholder:text-black/50 bg-transparent/5 
            border-2 text-xs md:text-2xl w-[10rem] md:w-[30rem] p-2 rounded'
        />

      <Button className="mt-3 md:mt-6" onClick={handleLogin}>
        Log In!
      </Button>
    </div>
  
    )
}

export default Login;