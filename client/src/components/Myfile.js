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
import Swal from "sweetalert2"
import { IoIosShareAlt } from "react-icons/io";

function Myfile() {

  const refreshPage =()=>{
    window.location.reload();
  }

  const [state,setState] = useState({
    search:""
  })
  const {search} = state
  const inputValue=name=>event=>{
    setState({...state,[name]:event.target.value})
    //console.log(name,"=",event.target.value)
    fetchData(event.target.value)
  }

  const url = String(process.env.REACT_APP_API) + "/getalldata"

  const[datas,setdatas] = useState([])

  const fetchData =(SE)=>{
    axios
    .get(url,{headers:{"userid":getNAME(),"search":SE}})
    .then(resp=>{
      setdatas(resp.data) 
    })
    .catch(err=>alert(err));
  }
  useEffect(()=>{
    fetchData("")
  },[])

  const downloadClick =(NAME,path,type)=>{
    //console.log({NAME,path,type})
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
      //console.log({res_data:res.data})
      const fileName = NAME + type
      //console.log(res.data)
      fileDownload(res.data,fileName)
    })
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true
  })

  const handleDelete = (path,type) => {
    //console.log({"userdatapath":path,"type":type})
    Swal.fire({
      title: 'Do you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap mtop',
        confirmButton: 'order-2 mtop',
      }
    }).then(async(result) => {
      if (result.isConfirmed){
        axios
        .delete(String(process.env.REACT_APP_API)+'/testdelete',{headers:{"UserDataPath":path,"Type":type}})
        .then(resp => {
          console.log(resp.data)
        })
        await Toast.fire({
          icon: 'success',
          title: 'Success'
        })
        refreshPage() 
      }       
    })
    }

    const sweet_input = (length,NAME,path,type) =>{
      axios
      .get(String(process.env.REACT_APP_API)+'/checkshare',
      {headers:{"owner":getNAME(),
                "filepath":path}})
      .then(resp=>{
        if(resp.data=='NO_DATA'){
          Swal.fire({
            title: 'Share To',
            html: `<input type="text" id="login" class="swal2-input" placeholder="share to">`,
            confirmButtonText: 'confirm',
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
              const to = Swal.getPopup().querySelector('#login').value
              return { shareto: to}
            }
          }).then(async(result) => {
            await Swal.fire(`
              share to : ${result.value.shareto}
            `.trim())
            makeid(length,NAME,path,type,result.value.shareto)
          })
        }
        else{
          Swal.fire(
            'Your link',
            `<a href="${resp.data}">${resp.data}</a>`,
            'success')
        }
      })  
    }

    function makeid(length,NAME,path,type,shareto) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      const slink = 'http://localhost:3000/share/'+result+NAME+';'+path.split('\\')[0]+path.split('\\')[1]+'<<!'+type+'>!'+ getNAME();
      axios
      .get(String(process.env.REACT_APP_API)+'/singlesharecreate',
      {headers:{"owner":getNAME(),
                "filename":NAME,
                "filepath":path,
                "filetype":type,
                "slugg":result,
                "shareto":shareto,
                "link":slink}})
      .then((resp)=>{
          //console.log({'from server':resp.data})
          Swal.fire(
              'Your link',
              `<a href="${resp.data}">${resp.data}</a>`,
              'success')
          //refreshPage()
      })
      .catch(err=>alert(err));
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
                        <button onClick={()=>handleDelete(datas.UserDataPath,datas.Type)}>
                          <div className='delete_icon'>
                            <MdDelete/>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className='button_share'>
                    {datas.map((datas,index)=>(
                      <div className='row_buttonS' key={index}>
                        <button onClick={()=>sweet_input(35,datas.UserDataName,datas.UserDataPath,datas.Type)}>
                          <div className='share_icon'>
                            <IoIosShareAlt/>
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