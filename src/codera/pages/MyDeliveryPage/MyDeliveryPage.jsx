import { useParams } from "react-router-dom"
import { useFetch } from "../../../hooks";
import { CodeEditor, CommentarySection, DeliveryDetail, TaskDetail } from "../../components";
import "./MyDeliveryPage.css";

export const MyDeliveryPage = () => {
    const {deliveryId}= useParams();
    const { data:delivery , isLoading: loadingDelivery} = useFetch(`task-deliveries/${deliveryId}`);

    return (
        <div className="main-content">
            <section className="main-layout">
                <div className="delivery-detail">
                {
                    loadingDelivery ? (<>Loading</>)
                    :
                    <>
                        <div className="left-section">
                            <TaskDetail  task={delivery.task}/>
                            <DeliveryDetail deliveryDate={delivery.deliveryDate} score={delivery.score}/>
                            <CommentarySection />
                        </div>
                        
                        <div className="right-section">
                        <CodeEditor
                            readOnly= {true}
                            defaultCode= {delivery.code}
                            defaultLanguage= {delivery.language}
                            showDownloadCodeButton={false}
                            showLanguagesSelector={false}
                            showAutoCompleteCheckbox={false}
                            showSnippetsCheckbox={false}
                            height="45vh"
                            />
                        </div>

                    </>
                }
                </div>
            </section>
        </div>
    )
}
