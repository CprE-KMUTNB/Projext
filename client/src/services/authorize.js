//เก็บข้อมูลเเละtokenลงseesion storage
export const authenticate=(response,next)=>{
    if(window !== "undefined"){
        //เก็บข้อมูลลงsession storage
        localStorage.setItem("token",JSON.stringify(response.data.token))
        localStorage.setItem("NAME",JSON.stringify(response.data.ID))
    }
    next()
}

//ดึง token
export const getToken=()=>{
    if(window !== "undefined"){
        if(localStorage.getItem("token")){
            return JSON.parse(localStorage.getItem("token"))
        }
        else{
            return false
        }
    }
}

//ดึง name
export const getNAME=()=>{
    if(window !== "undefined"){
        if(localStorage.getItem("NAME")){ 
            return JSON.parse(localStorage.getItem("NAME"))
        }
        else{
            return false
        }
    }
}

//logout
export const logout=(next)=>{
    //refresh
    const refreshPage =()=>{
    window.location.reload();
    }
    if(window !== "undefined"){
        localStorage.removeItem("token")
        localStorage.removeItem("NAME")
        refreshPage()
    }
    next()
}