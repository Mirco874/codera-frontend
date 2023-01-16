import './ClassCard.css';

export const ClassCard = ({id,className,classDescription,instructor}) => {
  return (
    <div className='class-card'>
        <p className='sub-title1'> <b>{className}</b></p>
        <p className='body2'><b>instructor:</b> {instructor}</p>
        <p className='body2'><b>code:</b> {id} </p>
    </div>
  )
}
