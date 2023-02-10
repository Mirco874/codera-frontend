import { getDate, getTime } from "../../helpers/date"
import "./Commentary.css"

export const Commentary = ( { commentary } ) => {
    const { id, user, content, commentTime, commentDate} =commentary

  return (
    <div className="commentary">
        <img className="student-photo" src={user.photo} alt={user.fullName} />

        <div className="commentary-detail">
            <div className="header">
                <p className="commentary-user-name subtitle2"><b>{user.fullName}</b></p>
                <p className="commentary-date"> { getDate(commentDate) } { getTime(commentDate) }  </p>    
            </div>    

            <div className="body">
                <p>
                    {content}
                </p>
            </div>
        </div>

    </div>
  )
}
