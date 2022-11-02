import React from 'react';
import Navbar from './Navbar';
import './sharepage.css'
import { useParams } from 'react-router-dom'
import { getNAME } from "../services/authorize"
import {useEffect,useState} from "react";
import axios from "axios";
import fileDownload from 'js-file-download'
import { AiOutlineFileImage,AiOutlineFilePdf,AiOutlineFileGif,AiOutlineFileUnknown,AiOutlineFileZip} from "react-icons/ai";
import { ImFileVideo } from "react-icons/im";
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';

function SharePage() {

  const utf8 = require("utf8");
  const navigate = useNavigate();
  
  const slug = useParams();
  //console.log(slug.slug.slice(35).split(';')[0]+'|'+slug.slug.slice(35).split(';')[1].slice(0,6)+'\\'+slug.slug.slice(35).split(';')[1].slice(6).split('<<!')[0]+slug.slug.slice(35).split(';')[1].slice(6).split('<<!')[1].split('>!')[0]+slug.slug.slice(35).split(';')[1].slice(6).split('<<!')[1].split('>!')[1])
  //console.log(slug.slug.slice(0,35))

  const[datas,setdatas] = useState([])
  
  const fetchData =()=>{
    axios
    .get(String(process.env.REACT_APP_API)+'/singleshare',
    {headers:{"filename":slug.slug.slice(35).split(';')[0],
              "filepath":slug.slug.slice(35).split(';')[1].slice(0,6)+'\\'+slug.slug.slice(35).split(';')[1].slice(6).split('<<!')[0],
              "filetype":slug.slug.slice(35).split(';')[1].slice(6).split('<<!')[1].split('>!')[0],
              "owner":slug.slug.slice(35).split(';')[1].slice(6).split('<<!')[1].split('>!')[1],
              "slugg":slug.slug.slice(0,35),
              "nowID":getNAME(),
              }})
    .then(async(resp)=>{
      //console.log(resp.data)
      if (resp.data == "You don't have access this file!") {
        await Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: resp.data
      })
      navigate('/')}
      else{
        //console.log(resp.data)
        setdatas(resp.data) 
      }  
    })
    .catch(err=>alert(err));
  }
  
  useEffect(()=>{
    fetchData()
  },[])

  const handleDownload = (NAME,path,type) => {
    axios
    .get(String(process.env.REACT_APP_API)+'/testdownload',
    {headers:{authorization:[NAME,path,type]},
    responseType: 'blob'})
    .then((res) => {
      //console.log({res_data:res.data})
      const fileName = NAME + type
      //console.log(res.data)
      fileDownload(res.data,utf8.decode(fileName))
    })
  }
  const filetype = String(slug.slug.slice(35).split(';')[1].slice(6).split('<<!')[1].split('>!')[0])
  //console.log(filetype)
  
  const checkfile = () => {
    if ((filetype == '.png')||(filetype == '.jpg')||(filetype == '.jpeg')){
      return 'img'
    }
    else if (filetype == '.pdf'){
      return 'pdf'
    }
    else if (filetype == '.gif'){
      return 'gif'
    }
    else if((filetype == '.zip')||(filetype == '.rar')){
      return 'zip|rar'
    }
    else if((filetype == '.mp4')||(filetype == '.mov')||(filetype == '.wmv')||(filetype == '.flv')||(filetype == '.avi')||(filetype == '.mkv')){
      return 'video'
    }
    else{
      return 'unknow'
    }
  }
  return (
    <>
      <Navbar/>
      <div className="bg_share">
        <div className='box_sharefile'>
          {checkfile()=='img'&&(
          <div className='icon_files'>
            <AiOutlineFileImage/>
          </div>
          )}
          {checkfile()=='pdf'&&(
          <div className='icon_files'>
            <AiOutlineFilePdf/>
          </div>
          )}
          {checkfile()=='gif'&&(
          <div className='icon_files'>
            <AiOutlineFileGif/>
          </div>
          )}
          {checkfile()=='unknow'&&(
          <div className='icon_files'>
            <AiOutlineFileUnknown/>
          </div>
          )}
          {checkfile()=='zip|rar'&&(
          <div className='icon_files'>
            <AiOutlineFileZip/>
          </div>
          )}
          {checkfile()=='video'&&(
          <div className='icon_files'>
            <ImFileVideo/>
          </div>
          )}
          <button onClick={()=>handleDownload(datas.FileName,datas.FilePath,datas.Type)}>
            <label>Download Here!</label>
          </button>
        </div>
      </div> 
    </>
  );
}
  
export default SharePage;