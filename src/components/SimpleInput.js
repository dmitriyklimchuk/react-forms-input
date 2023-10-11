import {useState, useRef} from "react";
import UseInput from "../hooks/use-input";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler,
        reset: resetNameInput,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        inputBlurHandler: emailBlurHandler,
        valueChangeHandler: emailChangeHandler,
        reset: resetEmailInput,
    } = useInput(value => value.trim() !== '');


    const nameInputRef = useRef();
    const emailInputRef = useRef();

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) { formIsValid = true; }

    const errorMessage = <p className='error-text'>Name must be not empty</p>;
    const inputClasses = nameInputHasError || emailInputHasError ? 'form-control invalid' : 'form-control';

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return
        }

        resetNameInput();
        resetEmailInput();
    }

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={inputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input  ref={nameInputRef}
                        value={enteredName}
                        onBlur={nameBlurHandler}
                        onChange={nameChangeHandler}
                        type='text' id='name'/>
                {nameInputHasError && errorMessage}
                <label htmlFor='email'>Your Email</label>
                <input  ref={emailInputRef}
                        value={enteredEmail}
                        onBlur={emailBlurHandler}
                        onChange={emailChangeHandler}
                        type='email' id='email'/>
                {emailInputHasError && errorMessage}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
