import React from 'react';
import './Login.css';
import './Login_screen.css' ;
import Navbar from './Navbar';
import {useState} from "react";
import axios from 'axios';
import Swal from "sweetalert2"
import { authenticate } from '../services/authorize';
import { Link,useNavigate } from 'react-router-dom';


function Login(props) {

    const [state,setState] = useState({
        ID:"",
        password:""
    })
    const {ID,password} = state
    //refresh
    const refreshPage =()=>{
        window.location.reload();
    }

    //กำหนดค่าstate
    const inputValue=name=>event=>{
        //console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value})
    }
    //ปุ่มsubmit
    const navigate = useNavigate();
    const submitForm=(e)=>{
        e.preventDefault();
        console.table({ID,password})
        axios
        .post(String(process.env.REACT_APP_API)+'/login',{ID,password})
        //login complete
        .then(response=>{
            console.log(response)
            Swal.fire(
                'Complete',
                'Your ID can login.',
                'success')
            setState({...state,ID:"",password:""})
            navigate('/')
            authenticate(response)
            refreshPage()
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
            <div className='bg_login'>
                <div className='box_login'>
                    <div className='title_login'>Login</div>
                    <div className='ID'>
                        <label>ID</label>
                        <input type="text" value={ID} onChange={inputValue("ID")}></input>
                    </div>
                    <div className='PASSWORD'>
                        <label>password</label>
                        <input type="password" value={password} onChange={inputValue("password")}></input>
                    </div>
                    <div className='box_button'>
                        <button onClick={submitForm} className="LoginButton">Login</button>
                        <button className="RegisterButton">
                            <Link to="/register"> Register</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;