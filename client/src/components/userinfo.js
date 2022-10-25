import React from 'react';
import './userinfo.css';
import Navbar from './Navbar';
import axios from "axios";
import {useState,useEffect} from "react";
import { getNAME } from "../services/authorize"
import { BiHide } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2"
import { Link } from 'react-router-dom';

function UserInfo() {

    const[datas,setdatas] = useState([])

    const getDATA =()=>{
        const ID = getNAME()
        axios
        .get(String(process.env.REACT_APP_API) + "/getsingledata",{headers:{authorization:ID}})
        .then(resp =>{
            setdatas(resp.data)
        })
    }
    useEffect(()=>{
        getDATA()
      },[])

    const [click,setClick] = useState(false)
    const hanclick = () => setClick(!click)

    const [clickedit,setclickdit] = useState(false)
    const hanclickedit = () => setclickdit(!clickedit)

    const [state,setState] = useState({
        edit:""
    })

    const {edit} = state

    const inputValue=name=>event=>{
        console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value})
    }

    const editsend = (e) =>{
        e.preventDefault();
        const ID = getNAME()
        axios
        .put(String(process.env.REACT_APP_API)+'/editname',{ID,edit})
        //edit complete
        .then(response=>{
            console.log(response)
            Swal.fire(
                'Complete',
                'Edit Success.',
                'success')
            setState({...state,edit:""})
            hanclickedit()
            getDATA()
        })
        .catch(err=>{ Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.data.error,
            footer: '<a href="">Why do I have this issue?</a>'
          })
        })
    }
    const refreshPage =()=>{
        window.location.reload();
      }

    return (
        <>
            <Navbar/>
            <div className='bg_userinfo'>
                <div className='box_userinfo'>
                    <div className='title_userinfo'>User</div>
                    <div className='labelID'>
                        <label>ID :</label>
                        <div className='ID_V'>{datas.ID}</div>
                    </div>
                    <div className='labelPASSWORD'>
                        <label>password :</label>
                            {click == false &&(<div className='PASS_VH'>{datas.PASSWORD}</div>)}
                            {click == true &&(<div className='PASS_V'>{datas.PASSWORD}</div>)}
                        <div className='icon_hide'><button onClick={hanclick}><BiHide/></button></div>
                    </div>
                    <div className='labelNAME'>
                        <label>name :</label>
                        {clickedit == false &&(<div className='NAME_V'>{datas.NAME}</div>)}
                        {clickedit == true &&(<div className='NAME_E'><input type="text" value={edit} onChange={inputValue("edit")}></input></div>)}
                        <div className='icon_edit'><button onClick={hanclickedit}><TbEdit/></button></div>
                        {clickedit == true && (<div className='confirm'>
                                <button onClick={editsend}>
                                    <label>confirm</label>
                                </button>
                            </div>)}
                    </div>
                </div>  
            </div>
        </>
    )
}

export default UserInfo;