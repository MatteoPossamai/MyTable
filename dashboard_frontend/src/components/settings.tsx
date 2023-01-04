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
                </section>

            </div>
        </> 
    )
}

export default Settings;