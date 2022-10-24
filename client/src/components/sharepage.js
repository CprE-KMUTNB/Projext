import React from 'react';
import Navbar from './Navbar';
import './sharepage.css'
import { useParams } from 'react-router-dom'
import { getNAME } from "../services/authorize"
import {useEffect,useState} from "react";
import axios from "axios";
import fileDownload from 'js-file-download'

function SharePage() {
  
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
              "shareto":""
            }})

    .then(resp=>{
      //console.log(resp.data)
      setdatas(resp.data) 
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
      fileDownload(res.data,fileName)
    })
  }

  return (
    <>
      <Navbar/>
      <div className="bg_share">
        <button onClick={()=>handleDownload(datas[0].FileName,datas[0].FilePath,datas[0].Type)}>
          Download Here!
        </button>
      </div> 
    </>
  );
}
  
export default SharePage;