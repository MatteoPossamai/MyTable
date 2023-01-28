// Global imports
import { useState } from "react";

// Local imports
// Styles
import '../styles/login.css';

function LoginPage(){
    // Handle the login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle the signup form
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

    return (
        <div className="authContainer">
            <section className="loginSection">
                <h1>Login</h1>
                <hr />
                <form className="authForm">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            </section>
            
            <section className="signupSection">
                <h1>Signup</h1>
                <hr />
                <form className="authForm">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="ccp" id="cp" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} />
                    <button type="submit">Signup</button>
                </form>
            </section>
        </div>
    )
}

export default LoginPage;