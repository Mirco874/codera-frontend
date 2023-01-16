import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onFormChange = ({ target }) => {
    const { value, name } = target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const onFormReset = () => {
    setFormData(initialState);
  };

  return { ...formData, formData, onFormChange, onFormReset };
};
