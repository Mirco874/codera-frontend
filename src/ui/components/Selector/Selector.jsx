import PropTypes from "prop-types";
import "./Selector.css";

export const Selector = ({ name, optionsList, defaultValue,  onChange, isLoading }) => {

  return (
    <select className="body2" name={name} onChange={onChange} defaultValue={name}>
      
      {(!defaultValue || defaultValue==="") && (
        <option className="body2" disabled  >
          {name}
        </option>
      )}

      {!isLoading &&
        optionsList.map(({ name }) => (
          <option key={name} className="body2" value={name.toLowerCase()}>
            {name}
          </option>
        ))}
        
    </select>
  );
};


Selector.propTypes={
  name:PropTypes.string,
  optionsList:PropTypes.array, 
  defaultValue:PropTypes.string,
  onChange:PropTypes.func,
  isLoading:PropTypes.bool
}


Selector.defaultProps={
  name:"selector",
  optionsList:[{name:"selector"}], 
  defaultValue:"",
  onChange: ()=>{console.log("onchange selector")} ,
  isLoading:false
}
