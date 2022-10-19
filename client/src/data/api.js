import axios from 'axios';
const apiUrl = String(process.env.REACT_APP_API);

export const singleFileUpload = async (data, options) => {
    try {
        await axios
        .post(apiUrl + '/singleFile', data, options)
        .then(resp=>{
            console.log({sever:resp.data})
        });
    } catch (error) {
        throw error;
    }
}
export const getSingleFiles = async () => {
    try {
            const {data} = await axios.get(apiUrl + '/getSingleFiles');
            return data;
    } catch (error) {
        throw error;
    }
}