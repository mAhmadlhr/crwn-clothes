import { useState } from "react";
import { createAuthUserWithEmailAndPassword,  createDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        try{

            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            
            await createDocumentFromAuth(user, { displayName });
            resetFields();

        }catch(error){
            if (error.code === 'auth/email-already-in-use') {
                alert("Can not create user, email already in use");
            }else {
            console.log('user creation encounter an erroe',error);
        }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your Email and Password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label = "Display Name"
                type='text' required
                 onChange={handleChange} 
                 name='displayName' 
                 value={displayName}/>

                <FormInput label = "Email" 
                type='email' required 
                onChange={handleChange} 
                name='email'
                 value={email}/>

                <FormInput label = "Password" 
                type='password' 
                required onChange={handleChange} 
                name='password' 
                value={password}/>

                <FormInput label = "Confirm Password" 
                type='password'  
                onChange={handleChange} required 
                name='confirmPassword' 
                value={confirmPassword}/>

                <Button buttonType= 'inverted' type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;