import { useState } from "react";
import { useFetch } from "../../../hooks";
import { Button, TextInput } from "../../../ui/components";
import { post } from "../../helpers/post";
import { getUserInformation } from "../../helpers/userData";
import { Commentary } from "../";
import "./CommentarySection.css";

export const CommentarySection = ({ deliveryId }) => {
  const [ commentary, setCommentary ] = useState("");

  const { data: previusCommentaries,
          isLoading: loadingCommentaries, 
          fetchData: reloadCommentaries } =useFetch(`comments?deliveryId=${deliveryId}`);
    console.log(previusCommentaries)

  const onCommentaryChange = ({ target }) =>{
    setCommentary(target.value);
  }

  const publishComment = async () => {
    const { id } = getUserInformation();
    const body = {
                  deliveryId,
                  userId: id,
                  content: commentary};

    const response = await post( "comments", body );
    console.log(response);
    reloadCommentaries();
  }

  return (
    <div className="commentary-section">
        <TextInput variation="text-area" height="8vh" width="100%" value={commentary}  onChange={onCommentaryChange}/>
        <Button text="Send comment" type="purple" height="35px" width="130px" borderRadius="10px" onClickFunction={publishComment} />
        <hr />
        <hr />
        {
          loadingCommentaries ? <>Loading</>
          :
          <>
          {
            previusCommentaries.map((commentary)=>(
              <Commentary commentary={commentary} />
              )
            )
          }
          </>

        }
    </div>
  )
}


