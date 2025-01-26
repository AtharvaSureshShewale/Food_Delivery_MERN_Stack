import React, { createContext, useContext, useReducer } from 'react';

//step 1: create context
//step 2: wrap all the child inside a provider
//step 3: pass value
//step 4: consumer k andar jaake consume karlo

const CartStateContext=createContext();
const CartDispatchContext=createContext();

const reducer=(state,action)=>{
    switch(action.type){
        case 'ADD':
            return [...state,{id:action.id,name:action.name,price:action.price,qty:action.qty,size:action.size,img:action.img}];

        case 'REMOVE':
            let newArr=[...state];
            newArr.splice(action.index,1)
            return newArr;

        case 'UPDATE':
            let arr=[...state];
            arr.find((food,index)=>{
                if(food.id===action.id){
                    arr[index]={...food,qty:parseInt(action.qty),price:action.price}
                }
                return arr;
            })
            return arr;

        case "DROP":
            let empArray=[];
            return empArray;

        default:
            console.log("Error in Reducer");
    }
}

export const CartProvider=({children})=>{
    const[state,dispatch]=useReducer(reducer,[]);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}

export const useCart=()=>useContext(CartStateContext);
export const useDispatch=()=>useContext(CartDispatchContext);
