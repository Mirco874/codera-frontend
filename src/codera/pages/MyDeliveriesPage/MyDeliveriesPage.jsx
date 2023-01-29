import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { InfoMessage } from "../../../ui/components";
import { DeliveredTaskCard, LinkedText, Loading } from "../../components";
import "./MyDeliveriesPage.css"

export const MyDeliveriesPage = () => {
    const { classId } = useParams();

    const { data: classGroup ,
            isLoading: loadingClassGroup } = useFetch(`classes/${classId}`);

    const { data: deliveries, 
            isLoading: loadingDeliveries } = useFetch( `task-deliveries?classId=${classId}`);

  return (  
        <div className="main-content">
            <section className="main-layout">
                <div className="deliveries">
                {
                 !loadingClassGroup &&
                    <h2 className="header6 section-title">
                        <LinkedText className="header6" path="/classes">
                            My classes
                        </LinkedText> 
                            {">"} 
                        <LinkedText className="header6" back={true}>
                            { classGroup.className } 
                        </LinkedText>
                            {"> "} 
                            current deliveries
                    </h2>    
                }
                <InfoMessage text="your tasks completed should be here" />
                {   
                    loadingDeliveries ? (<Loading/>) 
                    : <ul className="my-deliveries-list">
                    {
                        deliveries.map(
                            (taskDelivery)=> ( <li><DeliveredTaskCard delivery={taskDelivery}/></li> )
                        )
                    }
                    </ul>
                }
                </div>
            </section>
        </div>
        );
};
