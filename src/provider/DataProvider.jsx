import {createContext} from 'react'
import { useFetch } from '../hooks';

export const ApplicationContext= createContext();

export const DataProvider = ({children}) => {
    const { data: languageList, isLoading: languagesLoading, fetchData:fetchLanguages}=useFetch("programming-languages");

    const { data: classesList, isLoading: classsesLoading, fetchData:fetchClasses} = useFetch("classes");
    
    const themeList = [
        { name: "monokai" },
        { name: "github" },
        { name: "dracula" },
    ];
    
    const inheritedValue={
        languageList,
        languagesLoading,
        fetchLanguages,
        classesList,
        classsesLoading,
        fetchClasses,
        themeList} 

  return (
    <ApplicationContext.Provider value={inheritedValue} >
        {children}
    </ApplicationContext.Provider>
  )
}
