import { AiOutlineBook } from "react-icons/ai";
import { BsCodeSlash, BsFillFilePersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { NavigationButton } from "../../../ui/components";
import { useFetch } from "../../../hooks";
import "./SideBar.css";

export const SideBar = () => {
  const { data,isLoading } = useFetch("users/me");

  return (
    <aside className="sideBar">
      <div className="sideBar-content">

        {isLoading? 
        <>
          <img className="profile-img" src="../../assets/images/default_profile_picture.png" alt="defalt profile" />
          <p className="body2">fullName</p>
        </>
        :<> 
          {
            data.photo==="" ? 
            <img className="profile-img" src="../../assets/images/default_profile_picture.png" alt="not found profile" />
            : <img className="profile-img" src={data.photo} alt={data.fullName} />
          }
          <p className="body2">{data.fullName}</p>
        </> }

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
          icon={<BsFillFilePersonFill />}
          text="Profile"
          path="/profile"
        />

      </div>
    </aside>
  );
};
