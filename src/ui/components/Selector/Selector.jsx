import "./Selector.css";

export const Selector = ({ name, optionsList, defaultValue,  onChange, isLoading }) => {

  return (
    <select className="body2" name={name} onChange={onChange}>
      
      {!defaultValue && (
        <option className="body2" disabled selected>
          {name}
        </option>
      )}

      {!isLoading &&
        optionsList.map(({ name }) => (
          <option key={name} className="body2" value={name.toLowerCase()}>
            {name}
          </option>
        ))}
        
    </select>
  );
};
