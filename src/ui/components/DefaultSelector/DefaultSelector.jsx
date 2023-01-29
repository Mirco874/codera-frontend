import { Selector } from "../";

export const DefaultSelector = ({ name, objectList , defaultValue,  onChange, isLoading }) => {


    const onSelectorChange=( event , atributeName )=>{
        const { value: optionSelected } = event.target;
        const objectSelected = JSON.parse( optionSelected );
        onChange( { target: { name: atributeName, value: objectSelected } });
      }

  return (
    <Selector 
        name={name} 
        objectList={objectList} 
        defaultValue={defaultValue}
        isLoading={isLoading} 
        onChange={onSelectorChange}    
    />

  )
}      