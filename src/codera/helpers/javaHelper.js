export const validateClassName=(className)=>{
    if(className===null || className==="class"){
      return false;
    }

    return /^[a-zA-Z]+$/.test(className);
  }

export const findClassName=(javaCode)=>{
  let wordArray=javaCode.split(" ");

  const classWordIndex=wordArray.indexOf("class");
  
  if(!wordArray[classWordIndex+1] || classWordIndex===-1){
    return null;
  }

  return wordArray[classWordIndex+1];
}