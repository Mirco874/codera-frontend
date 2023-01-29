import axios from "../../api/axios";

export const getFromAPI= async ( path ) => {
    const token=localStorage.getItem("token");

    const headers={
        headers:{'Authorization': 'Bearer ' + token}
    }

    const response= await axios.get(path, headers );

    return response;
}