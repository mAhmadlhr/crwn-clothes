import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {  
        signInWithGooglePopup,
        createDocumentFromAuth,
         }  
        from "../../utils/firebase/firebase.utils";


const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createDocumentFromAuth(user);
    };
   
    return(
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign In with Goolge Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;