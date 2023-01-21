import { Button, TextInput } from "../../../ui/components";
import "./CommentarySection.css";
export const CommentarySection = () => {
  return (
    <div className="commentary-section">
        <TextInput variation="text-area" height="8vh" width="100%"/>
        <Button text="Send comment" height="35px" width="130px" borderRadius="10px" />
    </div>
  )
}
