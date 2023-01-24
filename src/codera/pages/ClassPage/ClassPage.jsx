import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { LinkedText, OptionButton } from "../../components";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import {AiFillEye} from "react-icons/ai"
import{GrAdd} from "react-icons/gr"

import "./ClassPage.css";
import { getUserInformation } from "../../helpers/userData";

export const ClassPage = () => {
  const { classId } = useParams();
  const { data, isLoading } = useFetch(`classes/${classId}`);

  const getUserId = () => {
    console.log("loaded user id");
    return getUserInformation().id;
  };

  return (
    <div className="main-content">
      <section className="main-layout">
        {isLoading ? ( <>Loading</>  ) : 
        ( <>
            <h2 className="header6 section-title"> 
                <LinkedText className="header6" path="/clases" >My classes</LinkedText> {">"} {data.className} 
            </h2>

            {typeof data.instructor !== "undefined" && 
              ( <p className="body2"> <b>Instructor: </b> {data.instructor.fullName} </p> )
            }
            <div className="option-buttons">
            {getUserId() === data.instructor.id ? 
              ( <>
                  <OptionButton
                    text="New Task"
                    icon={<GrAdd size={100} />}
                    navigateTo="create-task"
                  />
                  <OptionButton
                    text="Check tasks"
                    icon={<AiFillEye size={100} />}
                    navigateTo="check-tasks"
                  />
                </>
              ) 
              :(
                <>
                  <OptionButton
                    text="Pending tasks"
                    icon={<BsFillFileEarmarkCodeFill size={100} />}
                    navigateTo="pending-tasks"
                  />
                  <OptionButton
                    text="Delivered tasks"
                    icon={<GoChecklist size={100} />}
                    navigateTo="delivered-tasks"
                  />
                </>
              )
            }
          </div>
          </>)
      }

      </section>
    </div>
  );
};
