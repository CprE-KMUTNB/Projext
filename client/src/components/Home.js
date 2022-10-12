import React from 'react';
import './Home.css';
import './Home_screen.css' ;
import axios from "axios";
import fileDownload from 'js-file-download'

const handleDownload = (namefile) => {
  axios.get(String(process.env.REACT_APP_API)+'/testdownload',{responseType: 'blob'})
  .then((res) => {
    const fileName = "test" +"."+ String((res.data['type'].split("/"))[res.data['type'].split("/").length-1])
    console.log(res.data)
    fileDownload(res.data,fileName)
  })
}

function Home() {

  return (
    <>
      <div className='bg_Home'>
        <h1>Home page</h1>
        <button onClick={handleDownload}>Test Download</button>
      </div>
    </>
  )
}

export default Home;