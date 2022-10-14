exports.getDATA =(req,res)=>{
    const auth = req.headers.authorization;
    const split = auth.split(",")
    const name = split[0]
    const path = split[1]
    const type = split[2]
    console.log(split[2])
    switch(true){
        case String(type) == ("File folder") :
            const file_path_ff = String(path) + String(name) + ".zip"
            console.log(file_path_ff)
            return res.download(file_path_ff)
        case String(type) != ("File folder") :
            const file_path = String(path) + String(name) + String(type)
            return res.download(file_path)
    }
}