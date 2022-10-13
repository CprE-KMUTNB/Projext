import {BrowserRouter,Routes,Route} from "react-router-dom"
import App from "./App"
import Register from "./components/register"
import Login from "./components/login"
import Myfile from "./components/Myfile"


const MyRoute=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/myfile" element={<Myfile/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoute;