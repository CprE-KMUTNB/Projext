
module.exports.deletesingle =(file) => {
    singlefiles.findOneAndDelete({ 
        fileName: file }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
}