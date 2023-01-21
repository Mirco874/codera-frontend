import PropTypes from "prop-types";
import { LanguageIcon } from "../../../ui/components";
import "./AllowedLanguages.css";

export const AllowedLanguages = ({languagesList}) => {
  return (
    <div className="languages">
        <p><b>Allowed languages: </b></p>
        {
            languagesList.map(
                ({id, name, logo})=>(
                    <LanguageIcon key={id} image={logo} name={name} />
                )
            )
        }
    </div> 
  )
}

AllowedLanguages.defaultProps={
    languagesList:[]
}

AllowedLanguages.propTypes={
    languagesList:PropTypes.array
}



