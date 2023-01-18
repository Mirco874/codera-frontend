import './ClassCard.css';
import {useNavigate} from 'react-router-dom';

export const ClassCard = ({id,className,classDescription,instructor}) => {
    const navigate=useNavigate();
  return (
    <div className='class-card' onClick={()=>{navigate(id)}}>
        
        <p className='sub-title1'> <b>{className}</b></p>
        <p className='body2'><b>instructor:</b> {instructor}</p>
        <p className='body2'><b>code:</b> {id} </p>
        
    </div>
  )
}
