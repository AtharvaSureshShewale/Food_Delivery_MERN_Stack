import React, { useState,useEffect,useCallback } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {

  const baseurl="http://localhost:5000";
  const endpoint="/api/foodData";
  const fullurl=baseurl+endpoint;
  
  const[search,setSearch]=useState('');
  const[foodCat,setFoodCat]=useState([]);
  const[foodItem,setFoodItem]=useState([]);

  const loadData=useCallback(async()=>{
    const response=await fetch(fullurl,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })

    const result=await response.json();

    if(response.ok){
      setFoodItem(result[0]);
      setFoodCat(result[1]);
    // console.log(result[0],result[1]);
    }
    
    if(!response.ok){
      console.log(result);
    }
  },[fullurl]);

  useEffect(()=>{
    loadData();
  },[loadData]);

  return (
    <>
      <div><Navbar /></div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{zIndex:"10"}}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{
                  setSearch(e.target.value);
                }}
              />
              {/* <button className="btn btn-outline-warning text-white " type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src={require("../assests/images/burger.jpg")}
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(40%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src={require("../assests/images/pizza.jpg")}
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(40%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src={require("../assests/images/pasta.jpg")}
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(40%)"}}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {
          foodCat !==0
          ?foodCat.map((data)=>{
            return(
              <div  key={data._id}className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                  
                {
                  foodItem!==0
                  ?foodItem.filter((item)=>item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((filterItems)=>{
                      return(
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 m-2">
                          <Card foodItem={filterItems}
                          options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                  :<div>"""""""""""""</div>
                }
              </div>
            );
          })
          :<div>"""""""""""""""""</div>
        }
      
      </div>
      <div><Footer/></div>
    </>
  );
}
