// Complete login/signup component
function LoginPage(){
    return (
        <div className="authContainer">
            <section className="loginSection">
                <h1>Login</h1>
                <hr />
                <form className="authForm">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                    <button type="submit">Login</button>
                </form>
            </section>

            <section className="googleSection">
                <h1>Google</h1>
                <hr />

            </section>
            
            <section className="signupSection">
                <h1>Signup</h1>
                <hr />
                <form className="authForm">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                    <button type="submit">Signup</button>
                </form>
            </section>
        </div>
    )
}

export default LoginPage;