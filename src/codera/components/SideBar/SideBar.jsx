import { NavigationButton } from "../../../ui/components"
import {AiOutlineBook} from "react-icons/ai"
import {BsCodeSlash, BsFillFilePersonFill} from "react-icons/bs"
import {FiSettings, FiLogOut} from "react-icons/fi"
import './SideBar.css'
export const SideBar = ({photo,userName}) => {
  return (
    <aside className="sideBar">
        <img className="profile-img" src={photo} alt={userName}/>
        <p>{userName}</p>
        <NavigationButton icon={< AiOutlineBook/>} text="class" path="/classes"/>
        <NavigationButton icon={< BsCodeSlash/>}  text="practice" path="/practice" />
        <NavigationButton icon={< FiSettings/>}  text="settings" path="/settings" />
        <NavigationButton icon={< BsFillFilePersonFill/>}  text="profile" path="/profile" />
        <NavigationButton icon={< FiLogOut/>} text="logout"/>
    </aside>
  )
}

SideBar.defaultProps={
  photo:"https://i.pinimg.com/564x/ee/62/25/ee6225c2d8cbc8be4439d1325ad889da.jpg",
  userName:"unknow"
}
