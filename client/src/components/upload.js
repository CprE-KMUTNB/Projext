import React, {useState, useEffect} from 'react';
import './upload.css';
import FileUploadScreen from '../screens/FileUploadScreen';
import {getSingleFiles, getMultipleFiles} from '../data/api';
import Navbar from './Navbar';

function Upload() {

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
      <Navbar/>
      <div className="container">
        <h3 className="text-danger"></h3>
        <br/>
          <div className='circleP'>
            <FileUploadScreen getsingle={() => getSingleFileslist()}/>
          </div>
      </div> 
    </>
  );
}

export default Upload;