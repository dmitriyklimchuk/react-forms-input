import {useRef} from "react";
import useInput from "../hooks/use-input";
import InputField from "./InputField";

const SimpleInput = (props) => {
    const inputs = [
        {id: 'name', type: 'text'},
        {id: 'email', type: 'email'}
    ]

    const checkValue = value => value.trim() !== '';

    // use custom hook without object destructuring
    const testInput = useInput(checkValue);
    const enteredName = testInput.value;
    const enteredNameIsValid = testInput.isValid;
    const nameInputHasError = testInput.hasError;
    const nameBlurHandler = testInput.inputBlurHandler;
    const nameChangeHandler = testInput.valueChangeHandler;
    const resetNameInput = testInput.reset;

    console.log(testInput)

    // const {
    //     value: enteredName,
    //     isValid: enteredNameIsValid,
    //     hasError: nameInputHasError,
    //     inputBlurHandler: nameBlurHandler,
    //     valueChangeHandler: nameChangeHandler,
    //     reset: resetNameInput,
    // } = useInput(checkValue);

    // / use custom hook with object destructuring
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        inputBlurHandler: emailBlurHandler,
        valueChangeHandler: emailChangeHandler,
        reset: resetEmailInput,
    } = useInput(checkValue);


    const nameInputRef = useRef();
    const emailInputRef = useRef();

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) { formIsValid = true; }


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
                <InputField labelTitle='Your Name'
                            ref={nameInputRef}
                            inputId='name'
                            value={enteredName}
                            onBlur={nameBlurHandler}
                            onChange={nameChangeHandler}
                            hasError={nameInputHasError}
                            type='text' />
                <InputField labelTitle='Your Email'
                            ref={emailInputRef}
                            inputId='email'
                            value={enteredEmail}
                            onBlur={emailBlurHandler}
                            onChange={emailChangeHandler}
                            hasError={emailInputHasError}
                            type='email'/>
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
