//import React,{useState} from 'react';
import './Navbar.css';
import './Navbar_screen.css' ;
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from "axios";
import {useState,useEffect} from "react";
import { getNAME,logout } from "../services/authorize"

function Navbar() {

  //const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);
  //console.log(click);
  const [datas,setdatas] = useState([])

  const fetchData=()=>{
    axios
    .get(String(process.env.REACT_APP_API)+'/datauser')
    .then(response=>{
      setdatas(response.data)
    })
    .catch(err=>alert(err));
  }
  useEffect(()=>{
    fetchData()
  },[])
  const Slug = datas.map(data=>(data.slug)) //ดึงเฉพาะslugออกมาจากข้อมูลเเต่ละก้อน
  const LiksMyFile  = '/datauser/'+String(Slug[1])//เอาIDของuserที่loginมาใส่แทนslug[]

  const UserName = "user : "+String(getNAME())

  return (
    <>
      <div className='navbar'>
        <div className='box'>
          <div className='logo'>
            <Link to = "/"><h1>Projext</h1></Link>
          </div>
          <div className='links'>
            <Link to = "/">
              <h2>Home</h2>
            </Link>
            <Link to = "/">
              <h2>Myfile</h2>
            </Link>
            <a href='/'>
              <h2>Info</h2>
            </a>
          </div>
          {!getNAME() && (
            <div className='userbutton'>
            <button>
              <Link to ="/login">
                <div className='user_icon'>
                  <AiOutlineUser/>
                </div>
              </Link>
            </button>
          </div>)}
          {getNAME() && (
            <div className='username'>
              <h2>{UserName}</h2>
            </div>)} 
          {getNAME() && (
            <div className='logout_button'>
              <button onClick={()=>logout()}>
                  Logout
              </button>
            </div>)} 
        </div>
      </div>
    </>
  )
}

export default Navbar