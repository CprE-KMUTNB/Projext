//import React,{useState} from 'react';
import './Navbar.css';
import './Navbar_screen.css' ;
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Navbar() {

  //const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);
  const user_icon_click = () => {alert("user icon click")}
  //console.log(click);

  return (
    <>
      <div className='navbar'>
        <div className='box'>
          <div className='logo'>
            <a href='/'><h1>Projext</h1></a>
          </div>
          <div className='links'>
            <Link to = "/">
              <h2>Home</h2>
            </Link>
            <a href='/'>
              <h2>Myfile</h2>
            </a>
            <a href='/'>
              <h2>Info</h2>
            </a>
          </div>
          <div className='userbutton'>
            <button onClick={user_icon_click}>
              <Link to ="/login">
                <div className='user_icon'>
                  <AiOutlineUser/>
                </div>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar