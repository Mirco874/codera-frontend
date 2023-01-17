import { AiOutlineBook } from "react-icons/ai";
import { BsCodeSlash, BsFillFilePersonFill } from "react-icons/bs";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { NavigationButton } from "../../../ui/components";
import { useFetch } from "../../../hooks";
import "./SideBar.css";

export const SideBar = () => {
  const { data } = useFetch("users/me");
  const { fullName, photo } = data;

  return (
    <aside className="sideBar">
      <div className="sideBar-content">
        <img className="profile-img" src={photo} alt={fullName} />
        <p className="body2">{fullName}</p>
        <NavigationButton
          icon={<AiOutlineBook size={25} />}
          text="Class"
          path="/classes"
        />
        <NavigationButton
          icon={<BsCodeSlash />}
          text="Practice"
          path="/practice"
        />
        <NavigationButton
          icon={<FiSettings />}
          text="Settings"
          path="/settings"
        />
        <NavigationButton
          icon={<BsFillFilePersonFill />}
          text="Profile"
          path="/profile"
        />
        <NavigationButton icon={<FiLogOut />} text="Logout" />
      </div>
    </aside>
  );
};
