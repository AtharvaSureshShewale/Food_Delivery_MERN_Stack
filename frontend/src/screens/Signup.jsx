import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const[error,setError]=useState("");
  const[credentials,setCredentials]=useState({name:"",email:"",password:"",geolocation:""})

  const navigate=useNavigate();

  const baseurl="http://localhost:5000";
  const endpoint="/api/createuser";
  const fullurl=baseurl+endpoint;

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const response=await fetch(fullurl,{
      method:"POST",
      body:JSON.stringify({name:credentials.name,email:credentials.email,location:credentials.geolocation,password:credentials.password}),
      headers:{
        'Content-Type':'application/json'
      }
    });

    const result=await response.json();

    if(!response.ok){
        setError(result.message);
    }

    if(response.ok){
      setError("");
      setCredentials({name:"",email:"",password:"",geolocation:""});
      navigate('/login');
    }
  }

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value,})
  }

  console.log(credentials);

  return (
    <>
    <div className="container mt-5">
      {error && <div class="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange}/>
    </div>
    <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control"  aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
    </div>
    <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control"  name='password' value={credentials.password} onChange={onChange}/>
    </div>
    <div className="mb-3">
        <label  className="form-label">Address</label>
        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to="/login" className='ms-3 btn btn-danger'>Already a user</Link>
    </form>
    </div>
    </>
  )
}
