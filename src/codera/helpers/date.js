export const getDate=(dateTimeString)=>{
    const dateTime=new Date(dateTimeString);
    return `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()+1}`;  
}

export const getTime=(dateTimeString)=>{
    const dateTime=new Date(dateTimeString);
    return dateTime.toLocaleTimeString();
}