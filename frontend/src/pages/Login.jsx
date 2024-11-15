import React, { useState } from 'react'
import {motion} from "framer-motion";
import InputArea from '../components/InputArea'
import Header from './Header';
import HandleScroll from '../components/HandleScroll';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {Loader} from "lucide-react";

const Login = () => {

  var UserIsRegistered = true;

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {login, isLoading, error} = useAuthStore();

  function handleChange(event){
    const {name,value} = event.target;

    setFormData((prevData)=>({
        ...prevData,
        [name]:value
    }));
  }

  async function handleLogin(event){
    event.preventDefault();
    await login(formData.email, formData.password);
  }

  const isFormComplete= formData.email && formData.password;

  return (
    <>
      <HandleScroll />
      <Header />
      <form className='form-container' style={{width:"500px",height:"auto",margin:"200px auto"}}>
        <h1>Log In</h1>
        <InputArea 
        isSignUp={UserIsRegistered} 
        formData={formData} 
        onChange={handleChange}
        />
        <div className="forgot-contain">
          <Link to="/forgot-password" className='forgot-password'>Forgot Password ?</Link>
        </div>
        {error && <p style={{color: "red", fontWeight: "bold", padding:"5px", alignSelf:"self-start",marginBottom:"30px"}}>{error}</p>}
        <button 
        type='submit' 
        className={`form-submit-btn ${!isFormComplete && 'blur-btn'}`}
        disabled={!isFormComplete}
        onClick={handleLogin}
        >
         {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity }}
        >
        <Loader size={24} />
        </motion.div>
    ) : "Log In"}
        </button>
      </form>
      <div className="status-redirect">
       <p>Don't have an account ?{" "}
       <Link to="/signup" className='LinkTo'>Sign up</Link>
       </p>
      </div>
    </>
  )
}

export default Login
