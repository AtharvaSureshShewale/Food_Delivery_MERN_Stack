import React, { useEffect, useRef, useState } from 'react';
import { useCart,useDispatch } from './ContextReducer';
export default function Card(props) {
  let dispatch=useDispatch();
  let data=useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const priceRef=useRef();

  const[qty,SetQty]=useState(1);
  const[size,setSize]=useState("");
  const finalPrize=qty*parseInt(options[size]);

  const handleAddCart = async () => {
    let food=[];
    for(const item of data){
      if(item.id === props.foodItem._id){
        food=item;

        break;
      }
    }

    if(food!==0){
      if(food.size===size){
        await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrize,qty:qty});
        return;
      }
      else if(food.size!==size){
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrize,qty:qty,size:size,img:props.foodItem.img});
        return;
      }
      return;
    }

    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrize,qty:qty,size:size,img:props.foodItem.img});

    console.log(data);
  };

  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.desc}</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-warning rounded" onChange={(e)=>SetQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="m-2 h-100 bg-warning rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data, index) => (
                <option key={`${data}-${index}`} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrize}/-</div>
          </div>
        </div>
        <hr style={{ margin: "1rem 1rem", borderTop: "1px solid #ddd" }}/>
        <div>
          <button
            className="btn btn-warning ms-2 me-2 mb-2 w-auto text-white"
            onClick={handleAddCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
