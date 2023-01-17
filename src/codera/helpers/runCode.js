import axios from "../../api/axios";

export const runCode=async(path,body)=>{

    const token=localStorage.getItem("token");

    const headers={
        headers:{ 
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token},
    }

    const response= await axios.post(path, body, headers );

    return response;
}