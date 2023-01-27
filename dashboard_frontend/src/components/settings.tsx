// Local imports
// Styles
import "../styles/settings.css";

function Settings(){
    return (
        <>
            <h1 className="topHeading">Settings</h1>
            <div className="settingsContainer">
                <section className="settingsSection accountSection">
                    <h2>Account</h2>
                </section>

                <section className="settingsSection planSection">
                    <h2>Plan</h2>
                </section>

                <section className="settingsSection contactSection">
                    <h2>Contact</h2>
                    <p>If you need any assistance, don't exitate to contact us. </p>
                    <p>Here are our contacts</p>
                    <ul>
                        <li>Phone: +39 123 456 789</li>
                        <li>Email:
                            <a href="mailto: prova@gmail.com"> prova@gmail.com </a>
                        </li>
                    </ul>
                    <p>Otherwise, fill the form to open a ticket. We will reply back as soon as possible</p>
                    <form>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" name="subject" id="subject" placeholder="Subject" />
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" placeholder="Message" />
                        <button type="submit">Send</button>
                    </form>
                </section>

            </div>
        </> 
    )
}

export default Settings;