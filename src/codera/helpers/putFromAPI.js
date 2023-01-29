import axios from "../../api/axios";

export const putFromAPI= async ( path, body ) => {
    const token=localStorage.getItem("token");

    const headers={
        headers:{ 
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token},
    }

    const response= await axios.put(path, body, headers );

    return response;
}