import PropTypes from "prop-types";

export const TextInput = ({ type, placeholder, name, value, height, width, onChange, variation }) => {

  const style={
    height:height,
    width:width
  }
    
  return (
    variation==="text-area" ? 
    <textarea
      className="input-field"
      style={style}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    :
    <input
      className="input-field"
      style={style}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />

  );
};

TextInput.propTypes={
  type:PropTypes.string,
  placeholder:PropTypes.string,
  name:PropTypes.string,
  value:PropTypes.string, 
  height:PropTypes.string, 
  width:PropTypes.string, 
  onChange:PropTypes.func,
  variation:PropTypes.string
}

TextInput.defaultProps={
  type:"text",
  placeholder:"",
  name:"",
  value:"", 
  height:"38px", 
  width:"100px", 
  onChange:()=>{console.log("input changed")},
  variation:"input"
}
