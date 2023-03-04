import { useNavigate } from "react-router-dom";

function Plan(){
    // Import the useNavigate hook from react-router-dom to navigate to the payment page
    let history = useNavigate();

    // Create a function that will be called when the user clicks on the button
    const sendToPayment = () => {
        // get the id from the url
        let id = window.location.pathname.split("/")[2];
        history('/payment/' + id );
    }

    return (
        <section className="settingsSection planSection">
            <h2>Piano</h2>
            <p> Se vuoi verificare che piano stai utilizzando, modificarlo o aggiornare il tuo piano, clicca sul bottone qui sotto.
            </p>
            <button className="submitBTN" onClick={(e) => sendToPayment()}>Change Plan</button>
        </section>
    )
}

export default Plan;