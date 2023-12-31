import React, { useState } from 'react';
import './Login.css';
import { useUserAuth } from '../../Context/AuthContext';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../Hooks/useSignup';
import { useLogin } from '../../Hooks/useLogin';

export default function Login() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [lemail,lsetEmail]=useState("");
  const [lpassword, lsetPassword] = useState("");
  const {gSignIn, fSignIn}=useUserAuth();
  const [Ferror, setError] = useState("");
  const [reset, setReset] = useState("");
  const navigate = useNavigate()
  const {signup, serror, issLoading}= useSignup()
  const {login, lerror, islLoading}= useLogin()



  const handleToggle = () => {
    setIsSignUpActive(!isSignUpActive);
  };
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
        await signup(email,password)
        if(!serror)
        {
          handleToggle()
        }
        
        
    } catch(err){
        setError(err.message);
    }
  };
  const handleGoogleSignIn =async(e)=>{
    e.preventDefault();
    try{
        await gSignIn();
        navigate("/home");
    }catch(err)
    {
      setError(err.message)
    }
  }
  const handleFacebookSignIn =async(e)=>{
    e.preventDefault();
    try{
        await fSignIn();
        navigate("/home");
    }catch(err)
    {
      setError(err.message)
    }
  }
  const handleLogin= async(e)=>{
    e.preventDefault();
    try{
      await login(email,password)
      navigate("/home")
      
        
    } catch(err){
      setError(err.message)
    }
  };

  const handleResetPass = async(e)=>{
    e.preventDefault(e)
    try{
        
    } 
    catch(err)
    {
    }
  }


  return (
    <>
    <div className='lcontainer'>
      <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social" onClick={handleFacebookSignIn}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social" onClick={handleGoogleSignIn}><i className="fab fa-google-plus-g"></i></a>
            </div>
          {serror && <Alert variant='danger'>{serror}</Alert>}
            <input type="text" placeholder="Name"  />
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" className="button" value="Sign Up"/>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social" onClick={handleFacebookSignIn}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social" onClick={handleGoogleSignIn}><i className="fab fa-google-plus-g"></i></a>
            </div>
            {lerror && <Alert variant='danger'>{lerror}</Alert>}
            <input type="email" placeholder="Email" onChange={(e)=>lsetEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e)=>lsetPassword(e.target.value)}/>
            <Link to="/forgotpass">Forgot your password?</Link>
            <input type="submit" className="button" value="Login"/>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className={`overlay-panel overlay-left ${isSignUpActive ? 'overlay-left-active' : ''}`}>
              <h1>Welcome to Share Settle</h1>
              <p>Already have a account</p>
              <button className="ghost" onClick={handleToggle}>Sign In</button>
            </div>
            <div className={`overlay-panel overlay-right ${isSignUpActive ? 'overlay-right-inactive' : ''}`}>
              <h1>Hello, Buddy!</h1>
              <p>Don't have any account.</p>
              <button className="ghost" onClick={handleToggle}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
