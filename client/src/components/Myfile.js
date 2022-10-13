import React from 'react';
import './Myfile.css';
import './Myfile_screen.css' ;
import axios from "axios";
import fileDownload from 'js-file-download'
import Navbar from './Navbar';
import {useState,useEffect} from "react";
import { getNAME } from "../services/authorize"
import { TbDownload } from "react-icons/tb";

function Myfile() {

  const url = String(process.env.REACT_APP_API) + "/getalldata"

  const ID = String(getNAME())

  const[datas,setdatas] = useState([])

  const fetchData =()=>{
    axios
    .get(url,{headers:{authorization:ID}})
    .then(resp=>{
      setdatas(resp.data)
    })
    .catch(err=>alert(err));
  }
  useEffect(()=>{
    fetchData()
  },[])

  const downloadClick =(NAME,path,type)=>{
    handleDownload(NAME,path,type)
  }

  const handleDownload = (NAME,path,type) => {
    axios
    .get(String(process.env.REACT_APP_API)+'/testdownload',
    {headers:{authorization:[NAME,path,type]},
    responseType: 'blob'})
    .then((res) => {
      console.log({res_data:res.data})
      const fileName = NAME + type
      console.log(res.data)
      fileDownload(res.data,fileName)
    })
  }

    return (
      <>
        <Navbar/>
        <div className='bg_Myfile'>
          <div className='box_Myfile'>
            <div className='logo_Myfile'>
              <h1>Projext</h1>
            </div>
            <div className='line'></div>
            <div className='Info'>
              <div className='bg_Info'>
                <div className='filename'>Name</div>
                <div className='date_upload'>Date</div>
                <div className='type'>Type</div>
              </div>
              <div className='box_DATA'>
                <div className='name_DATA'>
                  {datas.map((name,index)=>(
                    <div className='row_name' key={index}>
                      <p>{name.UserDataName}</p>
                    </div>
                  ))}
                </div>
                <div className='date_DATA'>
                  {datas.map((date,index)=>(
                    <div className='row_name' key={index}>
                      <p>{date.createdAt}</p>
                    </div>
                  ))}
                </div>
                <div className='type_DATA'>
                  {datas.map((type,index)=>(
                    <div className='row_name' key={index}>
                      <p>{type.Type}</p>
                    </div>
                  ))}
                </div>
                <div className='button_download'>
                  {datas.map((data,index)=>(
                    <div className='row_button' key={index}>
                      <button onClick={()=>downloadClick(data.UserDataName,data.UserDataPath,data.Type)}>
                        <div className='download_icon'>
                          <TbDownload/>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div> 
          </div>
        </div>
      </>
    )
  }
  
  export default Myfile;