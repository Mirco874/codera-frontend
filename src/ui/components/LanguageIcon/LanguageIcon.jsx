import "./LanguageIcon.css"

export const LanguageIcon = ({ image, name }) => {
  return <img className="icon" src={image} alt={`${ name } logo`}  />;
};
