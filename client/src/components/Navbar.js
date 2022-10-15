import './Navbar.css';
import './Navbar_screen.css' ;
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { getNAME,logout } from "../services/authorize"

function Navbar() {

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
            <Link to = "/myfile">
              <h2>Myfile</h2>
            </Link>
            <Link to = "/upload">
              <h2>Info</h2>
            </Link>
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