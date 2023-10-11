import {useRef, useState} from "react";
import useInputBase from "../hooks/use-input-base";

const BasicForm = (props) => {
    const nameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();

    const formOnSubmitHandler = (event)=> {
        event.preventDefault();

        if (!isFormValid) {return}

        nameInputReset();
        lastNameInputReset();
        emailInputReset();
    }

    const checkIsEmpty = (value)=> value.trim() !== '';

    const errorMessage = <p className='error-text'>Name must be not empty</p>;

    const {
        value: nameValue,
        valueIsValid: nameValueIsValid,
        hasError: nameHasError,
        inputBlurHandler: nameInputBlurHandler,
        valueChangeHandler: nameValueChangeHandler,
        reset: nameInputReset
    } = useInputBase(checkIsEmpty);

    const {
        value: lastNameValue,
        valueIsValid: lastNameValueIsValid,
        hasError: lastNameHasError,
        inputBlurHandler: lastNameInputBlurHandler,
        valueChangeHandler: lastNameValueChangeHandler,
        reset: lastNameInputReset
    } = useInputBase(checkIsEmpty);

    const {
        value: emailValue,
        valueIsValid: emailValueIsValid,
        hasError: emailHasError,
        inputBlurHandler: emailInputBlurHandler,
        valueChangeHandler: emailValueChangeHandler,
        reset: emailInputReset
    } = useInputBase(checkIsEmpty);

    let isFormValid = false;

    if (nameValueIsValid && lastNameValueIsValid && emailValueIsValid) { isFormValid = true };
    const nameInputClasses = nameHasError ? 'form-control invalid' : 'form-control';
    const lastNameInputClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formOnSubmitHandler}>
            <div className='control-group'>
                <div className={nameInputClasses}>
                    <label htmlFor='name'>First Name</label>
                    <input ref={nameInputRef}
                           value={nameValue}
                           onBlur={nameInputBlurHandler}
                           onChange={nameValueChangeHandler}
                           type='text'
                           id='name'/>
                    {nameHasError && errorMessage}
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor='name'>Last Name</label>
                    <input ref={lastNameInputRef}
                           value={lastNameValue}
                           onBlur={lastNameInputBlurHandler}
                           onChange={lastNameValueChangeHandler}
                           type='text'
                           id='name'/>
                    {lastNameHasError && errorMessage}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='name'>E-Mail Address</label>
                <input ref={emailInputRef}
                       value={emailValue}
                       onBlur={emailInputBlurHandler}
                       onChange={emailValueChangeHandler}
                       type='text'
                       id='name'/>
                {emailHasError && errorMessage}
            </div>
            <div className='form-actions'>
                <button disabled={!isFormValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
