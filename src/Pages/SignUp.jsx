import React, { useState } from "react";
import './signUp.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const signUpHandler = (event) => {
    // event.preventDefault();
    setError('');  

    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then((response) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
      
        } else {
          setError("Token not found in response.");
        }
      })
      .catch((err) => {
        setError(err.message || 'Signup failed.');
      });
  }

  const inputChangeHandler = (event, inputType) => {
    const { value } = event.target;
    if (inputType === 'email') {
      setEmail(value);
    } else if (inputType === 'password') {
      setPassword(value);
    } else if (inputType === 'name') {
      setName(value);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={signUpHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              className="form-controll" 
              id="name" 
              placeholder="Enter your name" 
              required 
              value={name} 
              onChange={(event) => inputChangeHandler(event, 'name')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              className="form-controll" 
              id="email" 
              placeholder="Enter your email" 
              required
              value={email}
              onChange={(event) => inputChangeHandler(event, 'email')} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="form-controll" 
              id="password" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(event) => inputChangeHandler(event, 'password')}
            />
          </div>

          <a  href='/Login' onClick={signUpHandler} className="btn btn-continue mt-3">
           continue
        
          </a>


          <p className="plogin mt-5">
            Already have an account? 
            <Link to='/Login' className='loginn ms-1'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
