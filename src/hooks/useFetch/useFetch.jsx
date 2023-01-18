import { useEffect, useState } from "react";
import axios from "../../api/axios";

export const useFetch = (url = "") => {
  const [content, setContent] = useState({
    data: null,
    isLoading: true,
  });

  const fetchData = async () => {
    const token=localStorage.getItem('token');

    let config = {
      headers: {},
    };

    if (typeof(token==="undefined")) {
      config.headers = { Authorization: "Bearer " + token };
    }

    try {
      setContent({ ...content, isLoading: true });
      const response = await axios.get(url, config);
      setContent({ data: response.data, isLoading: false });
    } catch (error) {
      setContent({ ...content, isLoading: false });
    }
  };
  
  useEffect(() => {
    fetchData();
    console.log("data loaded")
  },[]);

  return { ...content, content, fetchData };
};
