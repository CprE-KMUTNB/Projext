/*import React from 'react';
import './Info.css';
import './Info_screen.css' ;
import { useRef } from "react";
import axios from 'axios';

function Info() {
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

   upload(fileObj) 
  };
  function upload (file){
    console.table({file:file})
    axios
    .post(String(process.env.REACT_APP_API)+'/singleFile',{file:file})
    .then (resp => {
      console.log(resp.data)
    })
    .catch(err=>alert(err));
  }

  return (
    <>
      <div className='bg_Info'>
        <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}></input>

        <button onClick={handleClick}>Open file upload box</button>
      </div>
    </>
  )
}

export default Info;*/
import React, {useState, useEffect} from 'react';
import './Info.css';
import FileUploadScreen from '../screens/FileUploadScreen';
import {getSingleFiles, getMultipleFiles} from '../data/api';

function Info() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const getSingleFileslist = async () => {
    try {
        const fileslist = await getSingleFiles();
        setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  const getMultipleFilesList = async () => {
    try {
        const fileslist = await getMultipleFiles();
        setMultipleFiles(fileslist);
        console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSingleFileslist();
    getMultipleFilesList();
  }, []);
  return (
    <>
        <div className="container">
          <h3 className="text-danger font-weight-bolder border-bottom text-center">Single & Multiple File Upload Using MERN Stack </h3>
          <FileUploadScreen getsingle={() => getSingleFileslist()} getMultiple={() => getMultipleFilesList()}/>
       </div> 
       <div className="container-fluid mt-5">
         <div className="row">
           <div className="col-6">
             <h4 className="text-success font-weight-bold">Single Files List</h4>
             <div className="row">
                {singleFiles.map((file, index) => 
                  <div className="col-6">
                    <div className="card mb-2 border-0 p-0">
                      <img src={`http://localhost:5500/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                      </div>
                  </div>
                )}
             </div>
           </div>
           <div className="col-6">
             <h4 className="text-success font-weight-bold">Multiple Files List</h4>
             {multipleFiles.map((element, index) =>
                <div key={element._id}>
                    <h6 className="text-danger font-weight-bold">{element.title}</h6>
                    <div className="row">
                      {element.files.map((file, index) =>
                        <div className="col-6">
                            <div className="card mb-2 border-0 p-0">
                              <img src={`http://localhost:5500/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                              </div>
                          </div>
                       )}
                      </div>
                </div>
              )}
           </div>
         </div>
       </div>
    </>
  );
}

export default Info;