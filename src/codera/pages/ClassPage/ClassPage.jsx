import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { OptionButton } from "../../components";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import "./ClassPage.css";

export const ClassPage = () => {
  const { classId } = useParams();
  const { data, isLoading } = useFetch(`classes/${classId}`);


  return (
    <div className="main-content">
      <section className="main-layout">
        {isLoading ? (
          <>Loading</>
        ) : (
          <>
            <h2 className="h6 section-title">
              My classes {">"} {data.className}
            </h2>
            {typeof data.instructor !== "undefined" && (
              <>
                {" "}
                <p className="body2">
                  <b>Instructor: </b>
                  {data.instructor.fullName}
                </p>{" "}
              </>
            )}
          </>
        )}
        <div className="option-buttons">
          <OptionButton
            text="Pending tasks"
            icon={<BsFillFileEarmarkCodeFill size={100} />}
          />
          <OptionButton
            text="Delivered tasks"
            icon={<GoChecklist size={100} />}
          />
        </div>
      </section>
    </div>
  );
};
