import React, { useState } from 'react'
import {motion} from "framer-motion";
import InputArea from '../components/InputArea'
import Header from './Header';
import HandleScroll from '../components/HandleScroll';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {Loader} from "lucide-react";


const SignUp = () => {

  var UserIsRegistered = false;

  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: ""
  });

  const {signup, error, isLoading} = useAuthStore();
  const navigate = useNavigate();

  function handleChange(event){
    const {name,value} = event.target;

    setFormData((prevData)=>({
        ...prevData,
        [name]:value
    }));
  }

  async function handleSignUp(event){
    event.preventDefault();
    
    try{
      await signup(formData.email,formData.password,formData.name);
      navigate("/verify-email"); 
    }
    catch(error){
      console.log(error);
    }
  }

  const isFormComplete = formData.name && formData.email && formData.password;

  return (
    <>

    <HandleScroll />
    <Header />
    <form className='form-container' style={{width:"500px",height:"auto",margin:"100px auto"}}>
      <h1>Create Account</h1>
      <InputArea
      isSignUp={UserIsRegistered} 
      formData={formData} 
      onChange={handleChange}
      />
      {error && <p style={{color: "red", fontWeight: "bold", padding:"5px", alignSelf:"self-start", marginBottom:"30px"}}>{error}</p>}
      <button 
      type='submit' 
      className={`form-submit-btn ${!isFormComplete && 'blur-btn'}`}
      disabled={!isFormComplete || isLoading}
      onClick={handleSignUp}
      >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Loader size={24} />
        </motion.div>
    ) : "Sign Up"}
      </button>
    </form>
    <div className="status-redirect">
      <p>Already have an account ? {" "}
      <Link to="/login" className='LinkTo'>Log In</Link>
      </p>
    </div>
  </>
  )
}

export default SignUp
