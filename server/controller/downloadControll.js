exports.getDATA =(req,res)=>{
    const auth = req.headers.authorization;
    const split = auth.split(",")
    const name = split[0]
    const path = split[1]
    const type = split[2]
    const file_path = String(path) + String(name) + String(type)
    return res.download(file_path)
}