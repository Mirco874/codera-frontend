import axios from "../../api/axios";

export const removeFromAPI=async(path)=>{

    const token=localStorage.getItem("token");

    const headers={
        headers:{ 
          'Authorization': 'Bearer ' + token},
    }

    const response= await axios.delete(path, headers );

    return response;
}