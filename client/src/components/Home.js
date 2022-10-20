import React from 'react';
import './Home.css';
import './Home_screen.css' ;
import styled from 'styled-components' ;
import { Link } from 'react-router-dom';
import MovingText from 'react-moving-text'
import bg_vid from "./video/Y2Mate.is - Cyber Security Background Video-gnFdL55LCuQ-1080p-1656371465771.mp4";

const Button = styled.button`
  background-color : white;
  color : black;
  padding : 5px 20px;
  border-radius : 8px;
  text-transform : uppercase;
  font-size: 1.5em;
  font-weight: bold;
  outline : 0;
  cursor : pointer;
  transition: ease background-color 850ms;
  font-family:'Poppins';
  &:hover {
      background-color : #F5EDDC;
      color : black;
    }
  `

  const MyAnimatedTypo = () => {
    return (
      <MovingText type="typewriter"
      dataText={[
      'The Most Minimalist.',
      'File Storage Site.',
      'By Pongwisit and Sivakorn.'
      ]} />)
     }

function Home() {

  return (
    <>
      <div className='bg_Home'>
        <div className='App'>
          <video autoPlay loop muted
            style = {{
              position: "absolute",
              width: "100%",
              left: "50%",
              height:"100%",
              top:"50%",
              objectFit:"cover",
              transform:"translate(-50%, -50%)",
              zIndex:"-1"
            }}
          >
            <source src={bg_vid} type="video/mp4" />
          </video>
        </div>
        <div className='Animation'>
            <MyAnimatedTypo /> 
        </div>
        <Link to = "/register"><Button>register and try for free</Button></Link>
      </div>
    </>
  )
}

export default Home;