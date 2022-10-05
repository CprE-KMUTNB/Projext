import React from 'react';
import './Login.css';
import Navbar from './Navbar';
import {useState} from "react";

import axios from "axios";

function Login() {
  const [state,setState] = useState({
    ID:"",
    PASSWORD:"",
    CONFIRM_PASSWORD:"",
    NAME:""
  })
  const {ID,PASSWORD,CONFIRM_PASSWORD,NAME} = state
  //กำหนดค่าstate
  const inputValue=name=>event=>{
    //console.log(name,"=",event.target.value)
    setState({...state,[name]:event.target.value})
  }
  const submitForm=(e)=>{
    e.preventDefault();
    console.table({ID,PASSWORD,CONFIRM_PASSWORD,NAME})
    console.log("API URL = ",process.env.REACT_APP_API)
    axios
    .post(String(process.env.REACT_APP_API)+'/login',{ID,PASSWORD,CONFIRM_PASSWORD,NAME})
    .then(response=>{alert("complete")})
    .catch(err=>{alert(err.response.data.error)})
  }

  return (  
    <>
      <Navbar/>
      <div className='bg'>
        <div className='box2'>
          <div className='title'>Register</div>
          <div className='inputID'>
            <label>Enter your ID</label>
            <input type="text" value={ID} onChange={inputValue("ID")}></input>
          </div>
          <div className='inputPASSWORD'>
            <label>Enter your PASSWORD</label>
            <input type="text" value={PASSWORD} onChange={inputValue("PASSWORD")}></input>
          </div>
          <div className='inputCONFIRM_PASSWORD'>
            <label>CONFIRM your PASSWORD</label>
            <input type="text" value={CONFIRM_PASSWORD} onChange={inputValue("CONFIRM_PASSWORD")}></input>
          </div>
          <div className='inputNAME'>
            <label>Enter your NAME</label>
            <input type="text" value={NAME} onChange={inputValue("NAME")}></input>
          </div>
        </div>
        <button onClick={submitForm}>Submit</button>
      </div>
    </>
  )
}

export default Login;