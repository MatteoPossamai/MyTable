// Global imports
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Local imports
// Components
import DonePopup from "./menu_page/donePopup";
// Styles
import '../styles/login.css';

function LoginPage(){
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let history = useNavigate();

    // Handle the login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle the signup form
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

    const [donePopupvisible, setDonePopupVisible] = useState(false);
    const [donePopupText, setDonePopupText] = useState("");

    // Handle the login call to the API
    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email.length < 1){
            alert("Email cannot be empty");
            return;
        }
        if (password.length < 1){
            alert("Password cannot be empty");
            return;
        }

        // Make the call to the API
        axios.post(`${base_link}/restaurant_user/login/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            email: email,
            password: password
        }).then((res) => {
            let token = res.data.token;
            let restaurant_id = res.data.restaurant_id;
            // save the token in the local storage
            localStorage.setItem("token", token);
            // Redirect to the home page
            history(`/dashboard/${restaurant_id}`);
        }).catch((err) => {
            setDonePopupVisible(true);
            setDonePopupText("Wrong email or password");
        })
    }

    // Handle the signup call to the API
    const handleSignup = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (signupEmail.length < 1){
            setDonePopupText("Email cannot be empty");
            setDonePopupVisible(true);
            return;
        }
        
        if(signupPassword !== signupConfirmPassword){
            setDonePopupText("Passwords do not match");
            setDonePopupVisible(true);
            return;
        }
        if (signupPassword.length < 8){
            setDonePopupText("Password must be at least 8 characters");
            setDonePopupVisible(true);
            return;
        }

        // Make the call to the API
        axios.post(`${base_link}/restaurant_user/signup/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            email: signupEmail,
            password: signupPassword,
            confirmPassword: signupConfirmPassword
        }).then((res) => {
            let token = res.data.token;
            // save the token in the local storage
            localStorage.setItem("token", token);
            // Redirect to the home page
            history(`/create_restaurant`);
        }
        ).catch((err) => {
            setDonePopupVisible(true);
            setDonePopupText("Email already exists");
        })
    }

    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
        setSeconds(seconds + 1);
        setDonePopupVisible(false);
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="authContainer">
            <section className="loginSection">
                <h1>Login</h1>
                <hr />
                <form className="authForm" onSubmit={(e) => handleLogin(e) }>
                    <label htmlFor="emailLogin">Email</label>
                    <input type="email" name="emailLogin" id="emailLogin" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="psw">Password</label>
                    <input type="password" name="psw" id="psw" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            </section>
            
            <section className="signupSection">
                <h1>Signup</h1>
                <hr />
                <form className="authForm" onSubmit={(e) => handleSignup(e)}>
                    <label htmlFor="emailsignup">Email</label>
                    <input type="email" name="emailsignup" id="emailsignup" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="ccp" id="cp" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} />
                    <button type="submit">Signup</button>
                </form>
            </section>
            <DonePopup text={donePopupText} visible={donePopupvisible} page={"login"} />
        </div>
    )
}

export default LoginPage;