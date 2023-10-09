import {useState, useRef} from "react";

const SimpleInput = (props) => {

    const nameInputRef = useRef();
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const enteredNameIsValid = enteredName.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;


    const errorMessage = <p className='error-text'>Name must be not empty</p>;
    const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);
    }

    const nameInputBlurHandler = (event) => {
        setEnteredNameTouched(true);
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        setEnteredNameTouched(true);
        if (!enteredNameIsValid) {
            return
        }

        setEnteredName('');
        setEnteredNameTouched(false);
    }

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input  ref={nameInputRef}
                        value={enteredName}
                        onBlur={nameInputBlurHandler}
                        onChange={nameInputChangeHandler}
                        type='text' id='name'/>
                {nameInputIsInvalid && errorMessage}
            </div>
            <div className="form-actions">
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
