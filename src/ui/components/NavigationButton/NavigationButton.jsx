import { NavLink } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import './NavigationButton.css'

export const NavigationButton = ({ icon, text ,path}) => {
  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? 'activeButton button-text' : 'inactiveButton button-text')}
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
  path:"/"
};
