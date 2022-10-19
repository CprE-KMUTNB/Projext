import React from 'react';
import './Myfile.css';
import './Myfile_screen.css' ;
import axios from "axios";
import fileDownload from 'js-file-download'
import Navbar from './Navbar';
import {useState,useEffect} from "react";
import { getNAME } from "../services/authorize"
import { TbDownload } from "react-icons/tb";
import { HiSearch } from "react-icons/hi";
import { ImUpload } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

function Myfile() {

  const refreshPage =()=>{
    window.location.reload();
  }

  const [state,setState] = useState({
    search:""
  })
  const {search} = state
  const SE =""
  const inputValue=name=>event=>{
    setState({...state,[name]:event.target.value})
    const SE = event.target.value
    //console.log(name,"=",event.target.value)
    fetchData(SE)
  }

  const url = String(process.env.REACT_APP_API) + "/getalldata"

  const ID = String(getNAME())
  
  const[datas,setdatas] = useState([])

  const fetchData =(SE)=>{
    axios
    .get(url,{headers:{"userid":ID,"search":SE}})
    .then(resp=>{
      setdatas(resp.data) 
    })
    .catch(err=>alert(err));
  }
  useEffect(()=>{
    fetchData(SE)
  },[])

  const downloadClick =(NAME,path,type)=>{
    if (type === "File folder"){
      type = ".zip"
    }
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
  const handleDelete = (path,type) => {
    console.log({"userdatapath":path,"type":type})
    axios
    .delete(String(process.env.REACT_APP_API)+'/testdelete',{headers:{"UserDataPath":path,"Type":type}})
    .then(resp => {
      console.log(resp.data)
    })
    refreshPage()
  } 


    return (
      <>
        <Navbar/>
        <div className='bg_Myfile'>
          {!getNAME() && (
          <div className='boxx'>
            <div className='box_search1'>
              <div className='icon_search'><HiSearch/></div>
              <input type="text" value={search} onChange={inputValue("search")}></input>
            </div>
          </div>
          )}
          {getNAME() && (
          <div className='boxx'>
            <div className='box_upload'>
              <Link to="/upload">
                <button>
                  <div className='icon_upload'><ImUpload/></div>
                  <label>upload</label>
                </button>
              </Link>
            </div>
            <div className='box_search'>
              <div className='icon_search'><HiSearch/></div>
              <input type="text" value={search} onChange={inputValue("search")}></input>
            </div>
          </div>
          )}
          <div className='box_ofMyfile'>
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
                        <p>{date.createdAt.slice(0,10)}</p>
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
                  <div className='button_delete'>
                    {datas.map((datas,index)=>(
                      <div className='row_buttonD' key={index}>
                        <button>
                          <div className='delete_icon' onClick={()=>handleDelete(datas.UserDataPath,datas.Type)}>
                            <MdDelete/>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div> 
          </div>
          </div>
        </div>
      </>
    )
  }
  
  export default Myfile;