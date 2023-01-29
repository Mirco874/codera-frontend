import PropTypes from "prop-types";
import "./Selector.css";

export const Selector = ({ name, objectList , defaultValue,  onChange, isLoading }) => {

  const initialValue= defaultValue ? defaultValue.name : name ;

  const onSelectorChange=(event)=>{
    onChange( event, name );
  }

  return (
    <select className="body2 selector" name={name} onChange={onSelectorChange} defaultValue={initialValue} >
      
        <option className="body2" disabled  >
          {name}
        </option>

      {(!isLoading) &&
        objectList.map(({ id, name }) => (
          <option 
            key={name} 
            className="body2" 
            value={ JSON.stringify({ id, name }) } 
            selected={ name === initialValue }
            >
            {name}
          </option>
        ))}
        
    </select>
  );
};


Selector.propTypes={
  name:PropTypes.string,
  objectList:PropTypes.array, 
  defaultValue:PropTypes.object,
  onChange:PropTypes.func,
  isLoading:PropTypes.bool
}


Selector.defaultProps={
  name:"selector",
  objectList:[{ id: 0, name:"selector"}], 
  defaultValue:null,
  onChange: ()=>{console.log("onchange selector")} ,
  isLoading:false
}
