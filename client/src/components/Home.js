import React from 'react';
import './Home.css';
import './Home_screen.css' ;
import styled from 'styled-components' ;
import { Link } from 'react-router-dom';
import MovingText from 'react-moving-text'


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
          <div className='Animation'>
            <MyAnimatedTypo /> 
          </div>
        </div>
        <Link to = "/register"><Button>register and try for free</Button></Link>
      </div>
    </>
  )
}

export default Home;