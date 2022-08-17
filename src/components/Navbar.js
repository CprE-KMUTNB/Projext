import React,{useState} from 'react';
import './Navbar.css';
import './Navbar_screen.css' ;
import { TiThMenu } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';

function Navbar() {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  console.log(click);
  /*const clossMobileMenu = () => setClick(false);*/

  return (
    <>
      <div className='navbar'>
        <div className='box'>
          <div className='menu_icon'onClick={handleClick}>{click ? (<MdClose/>):(<TiThMenu/>)}</div>
          <div className='Logo'>
            <a href='http://localhost:3000/'><h1>Projext</h1></a>
          </div>
          <div className={click ?'menu active':'menu'}>
            <div className='search_bar'>
              <input placeholder='Search'/>
            </div>
            <div className='links'>  
                <a href='http://localhost:3000/'>
                  <h2>Home</h2>
                </a>
                <a href='http://localhost:3000/'>
                  <h2>Market</h2>
                </a>
                <a href='http://localhost:3000/'>
                  <h2>Info</h2>
                </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar