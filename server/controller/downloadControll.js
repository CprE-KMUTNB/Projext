exports.getDATA =(req,res)=>{
    //ชื่อไฟล์เเละที่อยู่ ต้องใส่' . 'ให้ถูกด้วย
    var filePath = './assets/picZ.zip'
    res.download(filePath)
}