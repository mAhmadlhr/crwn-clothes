import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createDocumentFromAuth }
 from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createDocumentFromAuth(user);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword( email, password );
            console.log(response);
            resetFields();
        }catch(error){
            console.log(error);
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your Email and Password</span>

            <form onSubmit={handleSubmit}>

                <FormInput label = "Email" 
                type='email' required 
                onChange={handleChange} 
                name='email'
                 value={email}/>

                <FormInput label = "Password" 
                type='password' required
                 onChange={handleChange} 
                name='password' 
                value={password}/>
                <div className="buttons-container">
                    <Button buttonType= 'inverted' type='submit'>Sign In</Button>
                    <Button buttonType= 'google' type= 'button' onClick={signInWithGoogle} >Google Sign In </Button>
                </div>
                

            </form>
        </div>
    );
};

export default SignInForm;