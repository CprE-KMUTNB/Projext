import React from 'react';
import './Info.css';
import './Info_screen.css' ;
import { useRef } from "react";

function Info(props) {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    // 👇️ can still access file object here
    console.log('fileObj is', fileObj);
    console.log(fileObj.name);
    
    // 👇️ reset file input
    event.target.value = null;

    
  };

  return (
    <>
      
      <div className='bg_Info'>
        <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}>
        </input>

        <button onClick={handleClick}>Open file upload box</button>
      </div>
    </>
  )
}

export default Info;