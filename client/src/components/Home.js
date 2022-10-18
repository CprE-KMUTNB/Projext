import React from 'react';
import './Home.css';
import './Home_screen.css' ;
import styled from 'styled-components' ;
import { Link } from 'react-router-dom';
import MovingText from 'react-moving-text'


const Button = styled.button`
  background-color : #25316D;
  color : white;
  padding : 10px 25px;
  border-radius : 8px;
  text-transform : uppercase;
  font-size: 2.5em;
  font-weight: bold;
  outline : 0;
  cursor : pointer;
  box-shadow : 0px 2px 2px lightgray;
  transition :ease background-color 350ms;
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
        <Link to = "/register"><Button>try it for free</Button></Link>
      </div>
    </>
  )
}

export default Home;