import { useEffect, useState } from "react";
import { Selector } from "../";

export const FilteredSelector = ({ totalItemsList, selectedItemsList, name, isLoading, onChange}) => {
  const [availableItems, setAvailableItems] = useState([]);

  const getIdFromObjectList=(items)=>{
    return items.map(({id})=>id);
  }

  const addSelectedLanguage  =( event, atributeName ) => {
    const { value: selectedValue } = event.target;
    const selectedItem= JSON.parse(selectedValue);
    const newSelectedItemList= [...selectedItemsList, selectedItem ]
    onChange( { target: { name: atributeName, value: newSelectedItemList } });
  }

  useEffect(() => {
    if (totalItemsList) {
      const selectedItemIds=getIdFromObjectList(selectedItemsList); 
      const filteredItems = totalItemsList.filter(
        ({id}) => !selectedItemIds.includes(id)
      );
      setAvailableItems(filteredItems);
    }
  }, [selectedItemsList, totalItemsList]);

  return (
    <>
      <Selector
        objectList={availableItems}
        name={name}
        onChange={addSelectedLanguage}
        isLoading={isLoading}
      />
    </>
  );
};
