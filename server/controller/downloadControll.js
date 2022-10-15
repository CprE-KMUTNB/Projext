exports.getDATA =(req,res)=>{
    const auth = req.headers.authorization;
    const split = auth.split(",")
    const name = split[0]
    const path = "./"+split[1]
    const type = split[2]
    console.log(split[0])
    console.log(split[1])
    console.log(split[2])
    //    .assets/2022-10-15T13-12-54.311Z-Shimakaze1.png
    //    .assets/2022-10-15T13-12-54-Shimakaze1.png'
    switch(true){
        case String(type) == ("File folder") :
            const file_path_ff = String(path) + ".zip"
            console.log(file_path_ff)
            return res.download(file_path_ff)

        case String(type) != ("File folder") :
            const file_path = String(path)+ String(type)
            return res.download(file_path)
    }
}