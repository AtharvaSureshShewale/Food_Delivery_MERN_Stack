import React from 'react';
import { useCart, useDispatch } from '../components/ContextReducer';
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatch();

  if (data.length === 0) {
    return (
      <div className="m-5 w-100 text-center fs-3 text-white">The Cart is Empty!</div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const baseurl="http://localhost:5000";
  const endpoint="/api/orderData";
  const fullurl=baseurl+endpoint;

  const handleCheckOut= async()=>{
    let userEmail=localStorage.getItem("userEmail");

    const response= await fetch(fullurl,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date:new Date().toDateString()
      })
    });

    const result=await response.json();

    if(response.ok){
      dispatch({type:"DROP"});
      console.log(result.message);
    }



  }

  return (
    <div className='text-white'>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-response-md">
        <table className="table table-hover">
          <thead className="text-warning fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className='text-white'>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <FaTrash className='text-white mb-1' onClick={() => { dispatch({ type: "REMOVE", index: index }); }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-warning mt-5" onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
