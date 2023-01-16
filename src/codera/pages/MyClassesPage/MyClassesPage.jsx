import { useFetch } from "../../../hooks";
import { Button, InfoMessage } from "../../../ui/components";
import { ClassCard, SideBar } from "../../components";
import "./MyClassesPage.css";

export const MyClassesPage = () => {
  const { data, isLoading, content, fetchData } = useFetch("classes");
  console.log(data)
  return (
    <div className="body">
      <SideBar />
      <section className="main-layout">
        <h2 className="h6">My classes</h2>
        {isLoading && <p> loading</p>}
        {Object.keys(data).length === 0 ? (
          <InfoMessage text="Seems that you are not enrolled in any course" />
        ) : (
          <ul className="class-list">
            {data.map(({id,className,instructor }) => (
              <>
              <li style={{listStyleType:'none'}} key={id}>
                <ClassCard id={id} className={className} instructor={instructor.fullName}/>
              </li>
                      </>    
            ))}
          </ul>
        )}
        <div className="option-buttons">
          <Button
            type="blue"
            height="45px"
            width="246px"
            text="Join a class"
            borderRadius="20px"
          />
          <Button
            type="white"
            height="45px"
            width="246px"
            text="Create a class"
            borderRadius="20px"
          />
        </div>
      </section>
    </div>
  );
};
