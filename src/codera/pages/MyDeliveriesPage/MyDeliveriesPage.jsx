import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { DeliveredTaskCard } from "../../components";

export const MyDeliveriesPage = () => {
    const { classId } = useParams();

    const { data: deliveries, isLoading: loadingDeliveries } = useFetch(
        `task-deliveries?classId=${classId}`);

  return (  
        <div className="main-content">
            <section className="main-layout">
                <div className="deliveries">
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
