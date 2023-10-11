import React from "react";

const InputField = (props) => {
    const errorMessage = <p className='error-text'>Name must be not empty</p>;

    return (
        <React.Fragment>
            <label htmlFor={props.inputId}>{props.labelTitle}</label>
            <input type={props.type}
                   id={props.inputId}
                   value={props.value}
                   ref={props.ref}
                   onChange={props.onChange}
                   onBlur={props.onBlur}/>
            {props.hasError && errorMessage}
        </React.Fragment>
    )
}

export default InputField;