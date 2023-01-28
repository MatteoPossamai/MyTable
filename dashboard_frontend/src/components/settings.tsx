// Local imports
// Components
import AccountPreview from "./settings/account";
import Contact from "./settings/contact";
import Plan from "./settings/plan";
// Styles
import "../styles/settings.css";

function Settings(){
    return (
        <>
            <h1 className="topHeading">Settings</h1>
            <div className="settingsContainer">
                <AccountPreview />

                <Plan />

                <Contact />
            </div>
        </> 
    )
}

export default Settings;