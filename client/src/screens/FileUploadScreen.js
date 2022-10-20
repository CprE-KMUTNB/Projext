import React, {useState} from 'react';
import {singleFileUpload} from '../data/api';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./FileUploadScreen.css"
import { getNAME } from "../services/authorize"
import { AiOutlineDropbox } from "react-icons/ai";


const FileUploadScreen = (props) => {

    const [click,setClick] = useState(false)
    const hanclick = () => setClick(!click)

    const [click2,setClick2] = useState(false)
    const hanclick2 = () => setClick2(!click2)

    const [singleFile, setSingleFile] = useState('');
    const [singleProgress, setSingleProgress] = useState(0);

    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
        setClick(true)
        setClick2(false)
    }
    const singleFileOptions = {
        headers:{authorization:getNAME()},
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }

    const uploadSingleFile = async () => {
        hanclick()
        setClick2(true)
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData, singleFileOptions);
        props.getsingle();
    }

    return (
        <div className="bg_upscreen">
            <div className="box_upscreen">
                <div className="form-group">
                    <div className='title_text'>
                        <label>Select Single File </label>
                    </div>
                    <br/>
                    <input type="file" id='inputt' className="inputfile" onChange={(e) => SingleFileChange(e)}></input>
                    <div className='icon_drop'>
                        <label for='inputt'><AiOutlineDropbox/></label>
                        <p>drop here!</p>
                    </div>
                </div>
                {click2==true && (
                <div className="row">
                    <br/>
                    <div className="circle" style={{width:"15vw"}}>
                        <CircularProgressbar
                            value={singleProgress}
                            text={`${singleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '0.8vw',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(56, 100, 180, ${singleProgress / 100})`,
                                textColor: '#3899ee',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}/>
                    </div>
                </div>
                )}
                {click==true && (
                <div className="col-10">
                    <button type="button" className="btn btn-danger" onClick={() => uploadSingleFile()} >Upload</button>
                </div>
                )}
            </div>
        </div>
    );
}

export default FileUploadScreen;