import React, { useState } from "react";
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from "react-router-dom";
import Model from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const data=useCart();
  const [cartView,setCartView]=useState(false);
  const navigate=useNavigate();
  const handleClick=()=>{
    localStorage.removeItem("authToken");
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="">
            Mama's Kitchen
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
              <Link className="nav-link fs-5" aria-current="page" to="/myorderData">
                My Orders
              </Link>
              </li>
              :""
              }
            </ul>

              {
                !(localStorage.getItem("authToken"))
                ?
                <div className="d-flex">
                <Link className="btn bg-white text-warning mx-1 fw-bold" to="/login">
                  Login
                </Link>

                <Link className="btn bg-white text-warning mx-1 fw-bold" to="/createuser">
                  SignUp
                </Link>
                </div>
                :
                <div className="d-flex">
                  <div className="btn bg-white text-warning mx-2 fw-bold" onClick={()=>{setCartView(true)}}>
                  My Cart{" "}
                  {data.length===0?"":<Badge pill bg='danger'>{data.length}</Badge>}
                  </div>
                  {cartView? <Model onClose={()=>setCartView(false)}>
                    <Cart/>
                  </Model>:null}
                  <div className="btn bg-white text-danger mx-2 fw-bold" onClick={handleClick}>
                  Logout
                  </div>
                </div>
              }

          </div>
        </div>
      </nav>
    </>
  );
}
