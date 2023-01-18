import { NavLink } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import './NavigationButton.css'

export const NavigationButton = ({ icon, text ,path, onClick }) => {
  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? 'activeButton button-text' : 'inactiveButton button-text')}
        onClick={onClick}
      >
        {icon} 
        <p className="button-text">{text}</p>
      </NavLink>
    </>
  );
};

NavigationButton.defaultProps = {
  icon: <IoMdCloseCircleOutline />,
  text: "text",
  path:"/",
  onClick:()=>{}
};
