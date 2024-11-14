import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import HandleScroll from '../components/HandleScroll';
import Header from './Header';
import {useNavigate, useParams } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { OutlinedInput, InputAdornment } from '@mui/material';
import toast from 'react-hot-toast';

const ResetPassword = () => {

    const [formData, setFormData] =useState({
        password : "",
        confirmPassword: ""
    });

    const {resetPassword, isLoading, error, message} = useAuthStore();
    const {token} = useParams();
    const cleanToken = token.trim(); // Removes any leading or trailing spaces. ie:) eg: %20...
    const navigate = useNavigate();

    function handleChange(e){
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name] : value
        }));
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            alert("Passwords do not match");
            return;
        }
        try{
            await resetPassword(cleanToken,formData.password);
            toast.success("Password reset success, redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            },2000);
        }
        catch(error){
            toast.error(error.message || "Error resetting password");
        }

    }

    const isFormComplete = formData.password && formData.confirmPassword;

  return (
    <>
        <HandleScroll />
        <Header />
            
            <form className='form-container' style={{width:"500px",height:"400px",margin:"200px auto"}}>
            <h1>Reset Password</h1>

            <OutlinedInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password"
            required
            startAdornment = {
            <InputAdornment position='start'>
                <LockOutlinedIcon className='custom-input-icons' />
            </InputAdornment>
            }
            className='custom-input'
            />

            <OutlinedInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            startAdornment = {
            <InputAdornment position='start'>
                <LockOutlinedIcon className='custom-input-icons' />
            </InputAdornment>
            }
            className='custom-input'
            />
            
            {error && <p style={{color: "red", fontWeight: "bold", padding:"5px", alignSelf:"self-start",marginBottom:"20px"}}>{error}</p>}
            {message && <p style={{color: "green", fontWeight: "bold", padding:"5px", alignSelf:"self-start",marginBottom:"20px"}}>{message}</p>}
            <button 
            type='submit' 
            className={`form-submit-btn ${!isFormComplete && 'blur-btn'}`}
            disabled={!isFormComplete || isLoading}
            onClick={handleSubmit}
            >
            {isLoading ? "Resetting..." : "Update Password"}
            </button>
            </form>
    </>
  )
}

export default ResetPassword;

