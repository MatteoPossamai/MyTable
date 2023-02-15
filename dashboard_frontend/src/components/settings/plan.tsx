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
            <h2>Plan</h2>
            <p>Your current plan rappresents what service you are paying for, and it can be
                handled and modified at the following link.
            </p>
            <button className="submitBTN" onClick={(e) => sendToPayment()}>Change Plan</button>
        </section>
    )
}

export default Plan;