import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const[error,setError]=useState("");
  const[credentials,setCredentials]=useState({email:"",password:""});

  const navigate=useNavigate();

  const baseurl="http://localhost:5000";
  const endpoint="/api/login";
  const fullurl=baseurl+endpoint;

  const handleSubmit= async(e)=>{
    e.preventDefault();

    const response=await fetch(fullurl,{
      method:"POST",
      body:JSON.stringify({email:credentials.email,password:credentials.password}),
      headers:{
        'Content-Type':'application/json',
      }
    });

    const result=await response.json();



    if(!response.ok){
      setError(result.message);
    }

    if(response.ok){
      setError("");
      setCredentials({email:"",password:""});
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",result.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
  }

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value});
  }

  console.log(credentials);

  return (
    <>
    <div className="container mt-5">
          {error && <div class="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control"  aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control"  name='password' value={credentials.password} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/createuser" className='ms-3 btn btn-danger'>New user</Link>
        </form>
        </div>
    </>
  )
}

