import { useState, useEffect } from "react";
import axios from "../../api/axios";

export const useFetch = (url = "", token = "") => {
  const [content, setContent] = useState({
    data: {},
    isLoading: false,
  });

  const fetchData = async () => {
    let config = {
      headers: {},
    };

    if (token !== "") {
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
