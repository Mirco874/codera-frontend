import { SideBar } from "../../components";
import './MyClassesPage.css'
import {BsInfoCircleFill} from "react-icons/bs"

export const MyClassesPage = () => {
  return (
    <div className="body">
      <SideBar/>
      <section className="main-layout">
        
        <h1>My classes</h1>
        <BsInfoCircleFill/><p>Seems that you are not enrolled in any course</p>
      </section>
    </div>
  );
}
