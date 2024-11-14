import React, { useState } from 'react'
import {motion} from "framer-motion";
import { useAuthStore } from '../store/authStore';
import HandleScroll from '../components/HandleScroll';
import Header from './Header';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { OutlinedInput, InputAdornment } from '@mui/material';
import { ArrowLeft, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);

    const {isLoading, forgotPassword, error} = useAuthStore();

    function handleChange(event){
        const inputEmail = event.target.value;
        setEmail(inputEmail);
    }

    async function handleSubmit(e){
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);   
    }

  return (
    <>
        <HandleScroll />
        <Header />
        {!isSubmitted ? (
            
            <form className='form-container' style={{width:"500px",height:"400px",margin:"200px auto"}}>
            
            <h1>Forgot Password</h1>
            <p style={{textAlign:"center"}}>Enter your email address and we'll send you a link to reset your password.</p>
            <OutlinedInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
            startAdornment = {
            <InputAdornment position="start">
            <EmailOutlinedIcon className='custom-input-icons' />
            </InputAdornment>
            }
            className='custom-input'
        />
            {error && <p style={{color: "red", fontWeight: "bold", padding:"5px", alignSelf:"self-start",marginBottom:"30px"}}>{error}</p>}
            <button 
            type='submit' 
            className={`form-submit-btn ${email === "" && 'blur-btn'}`}
            disabled={email === ""}
            onClick={handleSubmit}
            >
            {isLoading ? (
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <Loader size={24} />
            </motion.div>
            ) : "Send Reset Link" }
            </button>
            </form>
        ): 
        (
            <div className="resetPassword-info" style={{width:"500px",height:"300px",margin:"200px auto"}}>
            <h1 style={{marginTop:"-10px"}}>Forgot Password</h1>
            <EmailOutlinedIcon style={{backgroundColor:"#f5ba13", color:"#fff", fontSize:"60px", padding:"7px", borderRadius:"50%"}} />
            <p style={{textAlign:"center"}}>If an account exists for {email}, you will receive a password reset link shortly.</p>
            </div>
        )}
        <div className="status-redirect">
        <p>
        <Link to="/login" className='LinkTo' style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <ArrowLeft style={{marginRight:"3px"}}/>Back to Login
        </Link>
        </p>
        </div>
  </>
  )
}

export default ForgotPassword;
