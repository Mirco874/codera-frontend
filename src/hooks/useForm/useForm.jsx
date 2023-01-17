import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onFormChange = ({ target }) => {
    const { value, name, type } = target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: !formData[name] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onFormReset = () => {
    setFormData(initialState);
  };

  return { ...formData, formData, onFormChange, onFormReset };
};
