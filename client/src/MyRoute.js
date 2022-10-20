import {BrowserRouter,Routes,Route} from "react-router-dom"
import App from "./App"
import Register from "./components/register"
import Login from "./components/Login"
import Myfile from "./components/Myfile"
import Upload from "./components/upload"
import UserInfo from "./components/userinfo"
import Info from "./components/Info"


const MyRoute=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/myfile" element={<Myfile/>}></Route>
                <Route path="/upload" element={<Upload/>}></Route>
                <Route path="/userinfo" element={<UserInfo/>}></Route>
                <Route path="/info" element={<Info/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoute;