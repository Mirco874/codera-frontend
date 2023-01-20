import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onFormChange = ({ target }) => {
  
    const { name, value, type } = target;
    console.log (name, value, type)
    if (type === "checkbox") {
      changeValue( name, !formData[ name ] );  
    } else {
      changeValue( name, value );
    }
    console.log(name,value)
  };

  const changeValue=(name, value)=>{
    setFormData({ ...formData, [name]: value });
  }

  const onFormReset = () => {
    setFormData(initialState);
  };

  return { ...formData, formData, onFormChange, onFormReset, changeValue };
};
