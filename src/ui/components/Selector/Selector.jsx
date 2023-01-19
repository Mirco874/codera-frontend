import PropTypes from "prop-types";
import "./Selector.css";

export const Selector = ({ name, objectList , indexDefaultValue,  onChange, isLoading }) => {

  const existObject= objectList? objectList[indexDefaultValue] : null;
  const defaultValue=existObject ? existObject.id : name ;
 
  const handleChange=( event )=>{
    const { value: optionSelected } = event.target;
    const objectSelected = JSON.parse( optionSelected );
    onChange( { target: { name, value: objectSelected } });
  }
 
  console.log(defaultValue)
  return (
    <select className="body2" name={name} onChange={handleChange} defaultValue={defaultValue}>
      
        <option className="body2" disabled  >
          {name}
        </option>

      {(!isLoading) &&
        objectList.map(({ id, name }) => (
          <option key={name} className="body2" value={ JSON.stringify({id, name}) }>
            {name}
          </option>
        ))}
        
    </select>
  );
};


Selector.propTypes={
  name:PropTypes.string,
  objectList:PropTypes.array, 
  indexDefaultValue:PropTypes.number,
  onChange:PropTypes.func,
  isLoading:PropTypes.bool
}


Selector.defaultProps={
  name:"selector",
  objectList:[{ id: 0, name:"selector"}], 
  indexDefaultValue:-1,
  onChange: ()=>{console.log("onchange selector")} ,
  isLoading:false
}
