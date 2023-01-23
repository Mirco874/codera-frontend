import axios from "../../api/axios";

export const updateFromAPI= async ( path, body ) => {
    const token=localStorage.getItem("token");

    const headers={
        headers:{ 
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token},
    }

    const response= await axios.patch(path, body, headers );

    return response;

}