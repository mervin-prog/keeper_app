
import "./App.css"
import {Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import {Toaster} from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


//protect routes that require authentication
const ProtectedRoute = ({children}) =>{
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }

  if(!user.isVerified){
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

//redirect authenticated users to home-page
const RedirectAuthenticatedUser = ({children}) =>{
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }

  return children;
}
function App(){

  const {isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(()=>{checkAuth()},[checkAuth]);
  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
    <Routes>
      <Route path="/" 
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
      />
      <Route path="/signup" 
      element={
        <RedirectAuthenticatedUser>
          <SignUp /> 
        </RedirectAuthenticatedUser>
      } 
      />
      <Route path="/login" 
      element={
        <RedirectAuthenticatedUser>
          <Login /> 
        </RedirectAuthenticatedUser>
      }
      />
      <Route path="/verify-email" element=<EmailVerification /> />
      <Route path="/forgot-password" 
      element={
        <RedirectAuthenticatedUser>
          <ForgotPassword />
        </RedirectAuthenticatedUser>
      } 
      />
      <Route path="/reset-password/:token" 
      element={
        <RedirectAuthenticatedUser>
          <ResetPassword />
        </RedirectAuthenticatedUser>
      } 
      />
      {/*catch all routes */}
      <Route path="*" element={ <Navigate to="/" replace /> } 
      />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;