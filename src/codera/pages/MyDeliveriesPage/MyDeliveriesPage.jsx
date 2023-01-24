import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { DeliveredTaskCard, LinkedText } from "../../components";

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

                {   
                
                    loadingDeliveries ? (<> Loading ...</>) 
                    : <>

                    {
                        deliveries.map(
                            (taskDelivery)=> (<DeliveredTaskCard delivery={taskDelivery}/>)
                        )
                    }
                    </>
                }
                </div>
            </section>
        </div>
        );
};
