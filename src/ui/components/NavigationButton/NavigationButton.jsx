import { NavLink } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import './NavigationButton.css'

export const NavigationButton = ({ icon, text ,path}) => {
  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? 'activeButton' : 'inactiveButton')}
      >
        {icon}
         {text}
      </NavLink>
    </>
  );
};

NavigationButton.defaultProps = {
  icon: <IoMdCloseCircleOutline />,
  text: "text",
  path:"/"
};
