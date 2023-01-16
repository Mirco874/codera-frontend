import PropTypes from 'prop-types';
import './InputField.css'

export const InputField = ({placeholder,defaultText}) => {
  return (
    <input className='input-field' type='text' placeholder={placeholder}>
    </input>
  )
}

InputField.propTypes={
    placeholder:PropTypes.string,
    defaultText:PropTypes.string
}

InputField.defaultProps={
    placeholder:'',
    defaultText:''
}



