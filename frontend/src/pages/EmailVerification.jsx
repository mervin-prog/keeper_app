
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import {motion} from "framer-motion";
import { useAuthStore } from '../store/authStore';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EmailVerification = () => {

    const [code, setCode] = useState("");
    const {verifyEmail, error, isLoading} = useAuthStore();
    const navigate = useNavigate();

    function handleChange(event){
        const inputCode = event.target.value;
        setCode(inputCode);
    }

    async function handleVerify(event){
        event.preventDefault();
        
        try{
          await verifyEmail(code);
          navigate("/");
          toast.success('Email verified successfully');
        }
        catch(error){
          console.log(error);
        }
    }

  return (
    <form className='form-container' style={{margin: "300px auto"}}>
      <h1>Verify Your Email</h1>
      <p>Enter the 6-digit code sent to your email address</p>
      <TextField 
      fullWidth 
      id="filled-basic" 
      label="Code" 
      variant="filled" 
      className='custom-input-code'
      value={code}
      onChange={handleChange}
      />
      {error && <p style={{color: "red", fontWeight: "bold", marginTop: "2px"}}>{error}</p>}
      <button 
      type='submit'
      className={`form-submit-btn ${(code.length<6 || code.length>6)&& "blur-btn"}`}
      onClick={handleVerify}
      disabled={(code.length<6 || code.length>6) || isLoading}
      >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Loader size={24} />
        </motion.div>
    ) : "Verify"}
      </button>
    </form>
  )
}

export default EmailVerification
