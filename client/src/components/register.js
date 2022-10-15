import React from 'react';
import './register.css';
import Navbar from './Navbar';
import {useState} from "react";

import axios from "axios";
import Swal from "sweetalert2"

function Register() {
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
    .post(String(process.env.REACT_APP_API)+'/register',{ID,PASSWORD,CONFIRM_PASSWORD,NAME})
    .then(response=>{Swal.fire(
      'Complete',
      'Your ID can login.',
      'success')
      setState({...state,ID:"",PASSWORD:"",CONFIRM_PASSWORD:"",NAME:""})
    })
    .catch(err=>{ Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: err.response.data.error,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
  }

  return (  
    <>
      <Navbar/>
      <div className='bg'>
        <div className='box2'>
          <div className='title'>Register</div>
          <div className='inputID'>
            <label>ID</label>
            <input type="text" value={ID} onChange={inputValue("ID")}></input>
          </div>
          <div className='inputPASSWORD'>
            <label>password</label>
            <input type="password" value={PASSWORD} onChange={inputValue("PASSWORD")}></input>
          </div>
          <div className='inputCONFIRM_PASSWORD'>
            <label>confirm password</label>
            <input type="password" value={CONFIRM_PASSWORD} onChange={inputValue("CONFIRM_PASSWORD")}></input>
          </div>
          <div className='inputNAME'>
            <label>name</label>
            <input type="text" value={NAME} onChange={inputValue("NAME")}></input>
          </div>
          <button onClick={submitForm}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Register;