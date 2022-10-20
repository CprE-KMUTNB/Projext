import React from 'react';
import './Info.css';
import './Info_screen.css' ;
import Navbar from './Navbar';
import { BsGithub } from "react-icons/bs";

import P_Chun from './DEV_INFO/profile_chun.jpg'
import P_View from './DEV_INFO/profile_view.jpg'

function Info() {

  return (
    <>
      <Navbar/>
      <div className='bg_Info_page'>
        <div className='box_Info_page'>
          <div className='DEV'>
            <div className='title_dev'><h2>Developer</h2></div>
            <div className='Chun'>
              <img src={P_Chun}></img>
              <div className='info_chun'>
                <div className='icon_git'>
                  <BsGithub/>
                  <a href='https://github.com/Ashuu0'>github.com/Ashuu0</a>
                </div>
                <label>email : s6401012620064@email.kmutnb.ac.th</label>
              </div>
            </div>
            <div className='View'>
              <img src={P_View}></img>
              <div className='info_view'>
                <div className='icon_git'>
                  <BsGithub/>
                  <a href='https://github.com/BadZepper'>github.com/BadZepper</a>
                </div>
                <label>email : s6401012620129@email.kmutnb.ac.th</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Info;