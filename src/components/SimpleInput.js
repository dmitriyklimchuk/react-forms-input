/*
TODO: Try to loop components with received custom hook data,
 after that, provide data via props.
 Result = failed
   */

import {useRef, useEffect} from "react";
import useInput from "../hooks/use-input";
import InputField from "./InputField";

const SimpleInput = (props) => {
    const inputs = [
        {id: 'name', type: 'text'},
        {id: 'email', type: 'email'}
    ];

    let inputsOptions = []

    const checkValue = value => value.trim() !== '';

    const InputRef = useRef();

    const inputCustomHook = useInput(checkValue);

    const inputFields = inputs.map(input => {
        console.log(input.id)
        const modifiedData = inputCustomHook
        modifiedData[`entered${input.id}`] =  inputCustomHook.value;
        modifiedData[`entered${input.id}IsValid`] =  inputCustomHook.isValid;
        modifiedData[`${input.id}InputHasError`] =  inputCustomHook.hasError;
        modifiedData[`${input.id}BlurHandler`] =  inputCustomHook.inputBlurHandler;
        modifiedData[`${input.id}ChangeHandler`] =  inputCustomHook.valueChangeHandler;
        modifiedData[`reset${input.id}Input`] =  inputCustomHook.reset;

        console.log(modifiedData);

        inputsOptions.push({
            enteredFieldIsValid: modifiedData[`entered${input.id}IsValid`],
            inputHasError: modifiedData[`${input.id}InputHasError`],
            reset: modifiedData[`reset${input.id}Input`]

        });

        console.log(inputsOptions)

        modifiedData[`${input.id}InputRef`] = InputRef

        return (
            <InputField labelTitle={`Your ${input.id}`}
                        key={input.id}
                        ref={modifiedData[`${input.id}InputRef`]}
                        inputId={input.id}
                        value={modifiedData[`entered${input.id}`]}
                        onBlur={modifiedData[`${input.id}BlurHandler`]}
                        onChange={modifiedData[`${input.id}ChangeHandler`]}
                        hasError={modifiedData[`${input.id}InputHasError`]}
                        type={input.type} />
        )
    })

    let formIsValid = false;

    const isInputFieldsValid = inputsOptions.every(input => input.enteredFieldIsValid);
    const isSomeInputFieldsValid = inputsOptions.some(input => input.enteredFieldIsValid);
    const isSomeInputHasError = inputsOptions.some(input => input.inputHasError)

    if (isInputFieldsValid) { formIsValid = true; }


    const inputClasses = isSomeInputHasError ? 'form-control invalid' : 'form-control';

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if (!isSomeInputFieldsValid) {
            return
        }

        inputsOptions.forEach(elem => {
            elem.reset()
        })
    }

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={inputClasses}>
                {inputFields}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
