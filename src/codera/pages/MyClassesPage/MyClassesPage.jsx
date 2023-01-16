import { Button, InfoMessage } from "../../../ui/components";
import { SideBar } from "../../components";
import './MyClassesPage.css'

export const MyClassesPage = () => {

  return (
    <div className="body">
      <SideBar/>
      <section className="main-layout">  
        <h2 className="h6">My classes</h2>
        <InfoMessage text="Seems that you are not enrolled in any course"/>
        <div className="option-buttons">
          <Button type="blue" height="45px" width="246px" text="Join a class" borderRadius="20px"/>
          <Button type="white" height="45px" width="246px" text="Create a class" borderRadius="20px"/>
        </div>

      
      </section>
    </div>
  );
}
