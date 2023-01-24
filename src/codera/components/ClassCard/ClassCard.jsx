import {useNavigate} from 'react-router-dom';
import './ClassCard.css';

export const ClassCard = ({id,className,instructor}) => {
  const navigate=useNavigate();
  
  const goToClass=()=>{
    navigate(id);
  }

  return (
    <div className='class-card'>
      <div className='class-card-header' onClick={goToClass} >
        <p className='subtitle1'> {className}  </p>
        <p className='body2'><b>instructor:</b> {instructor}</p>
      </div>
        <hr />
        <p className='body2'><b>code:</b> {id} </p>
    </div>
  )
}
