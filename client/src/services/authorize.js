//เก็บข้อมูลเเละtokenลงseesion storage
export const authenticate=(response,next)=>{
    if(window !== "undefined"){
        //เก็บข้อมูลลงsession storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("NAME",JSON.stringify(response.data.ID))
    }
    next()
}

//ดึง token
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }
        else{
            return false
        }
    }
}

//ดึง name
export const getNAME=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("NAME")){ 
            return JSON.parse(sessionStorage.getItem("NAME"))
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
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("NAME")
        refreshPage()
    }
    next()
}