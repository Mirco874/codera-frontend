import { useEffect } from "react";
import { useState } from "react";
import {AiOutlineWarning} from "react-icons/ai";
import {CgDanger} from "react-icons/cg";
import {MdSentimentVerySatisfied} from "react-icons/md";
import "./RemainingDaysLabel.css";

export const RemainingDaysLabel = ({ limitDate }) => {
  
    const [ remainingDays, setRemainingDays ]= useState(10);

    const getRemainingDays=()=>{
        const currentDate= new Date().getTime();  
        const deadline= new Date(limitDate).getTime();
        const difference=(deadline-currentDate)/(1000*60*60*24) ;
        setRemainingDays(~~difference);
    }

    useEffect(()=>{
        getRemainingDays();
    },[])
  
    if(remainingDays<=1){
        return (
            <div className="label danger"> 
                <CgDanger/>  <p>{remainingDays} days left</p> 
            </div>)
    }

    if(remainingDays>1 && remainingDays<=3){
        return (
            <div className="label warning"> 
                <AiOutlineWarning/> <p>{remainingDays} days left</p> 
            </div>)
    }

    return (
        <div className="label secure"> 
            <MdSentimentVerySatisfied/> <p> {remainingDays} days left</p>
        </div>) 

};
