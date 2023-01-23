

import { getDate, getTime } from "../../helpers/date"
import "./Commentary.css"

export const Commentary = ( { commentary } ) => {
    const { id, user, content, commentTime, commentDate} =commentary

  return (
    <div className="commentary">
        <img className="student-photo" src={user.photo} alt={user.fullName} />

        <div className="data">
            <div className="header">
                <p><b>{user.fullName}</b></p>
                <p> { getDate(commentDate) } { getTime(commentDate) }  </p>    
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
