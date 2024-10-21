import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/userSlice";
const Login=()=>{
    const dispatch =useDispatch();
    const { loading, error, message } = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const loginHandler=()=>{
      dispatch(loginUser({ email, password }))
    }
    const inputChangeHandler = (event, inputType) => {
        const { value } = event.target;
        if (inputType === 'email') {
            setEmail(value);
        } else if (inputType === 'password') {
            setPassword(value);
        } 
    }
    
    useEffect(() => {
      if (message) {
          const token = localStorage.getItem('token');
          if (token) {
              console.log('Token exists:', token);
     
          }
      }
  }, [message]);
return(<>
 <div className="signup-container">
      <div className="signup-form">
        <h2 className="text-center">Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              className="form-controll" 
              id="email" 
              placeholder="Enter your email" 
              required 
            value={email} onChange={(event) => {
                inputChangeHandler(event, 'email');
            }} 
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
            value={password} onChange={(event) => {
                inputChangeHandler(event, 'password')}}
            />
          </div>
          <Link type="submit" to='/home' onClick={loginHandler} className=" btn btn-continue mt-3">continue</Link>

          <p className="plogin mt-5">Dont Have an acoount <Link to='/signUp' className='loginn ms-1'>SignUp</Link></p>
        </form>
      </div>
    </div>
</>)
}
export default Login ;