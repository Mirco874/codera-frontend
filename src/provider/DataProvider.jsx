import {createContext} from 'react'
import { useFetch } from '../hooks';

export const ApplicationContext= createContext();

export const DataProvider = ({children}) => {
  
    const { data: languageList, 
            isLoading: languagesLoading, 
            fetchData:fetchLanguages}=useFetch("programming-languages");

    const { data: classesList, 
            isLoading: classsesLoading, 
            fetchData:fetchClasses} = useFetch("classes");
    
    const themeList = [
        { id: "monokai", name: "Monokai" },
        { id: "github", name: "Github" },
        { id: "dracula", name: "Dracula" },
    ];

    const scoreList=[
      { id: 100, name:"100" },
      { id: 70, name:"70" },
      { id: 50, name:"50" },
      { id: 30, name:"30" },
      { id: 10, name:"10" },
      { id: 5, name:"5"},
  ]

 
    
    const inheritedValue={
        languageList,
        languagesLoading,
        fetchLanguages,
        classesList,
        classsesLoading,
        fetchClasses,
        themeList,
        scoreList
      } 

  return (
    <ApplicationContext.Provider value={inheritedValue} >
        {children}
    </ApplicationContext.Provider>
  )
}
