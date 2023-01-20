import { Selector } from "../";

export const DefaultSelector = ({ name, objectList , indexDefaultValue,  onChange, isLoading }) => {

    const onSelectorChange=( event , atributeName )=>{
        const { value: optionSelected } = event.target;
        const objectSelected = JSON.parse( optionSelected );
        onChange( { target: { name: atributeName, value: objectSelected } });
      }

  return (
    <Selector 
        name={name} 
        objectList={objectList} 
        indexDefaultValue={indexDefaultValue} 
        isLoading={isLoading} 
        onChange={onSelectorChange}    
    />

  )
}      