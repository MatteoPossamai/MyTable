import { useNavigate } from "react-router-dom";

function AccountPreview(){
    // Import the useNavigate hook from react-router-dom to navigate to the account page
    let history = useNavigate();

    // Create a function that will be called when the user clicks on the button
    const sendToPayment = () => {
        // get the id of the restaurant from the URL
        let id = window.location.pathname.split("/")[2];

        history(`/account/${id}`);
    }

    return (
        <section className="settingsSection accountSection">
            <h2>Account</h2>

            <p> 
                Your account rappresents your activity informations, and holds everything related to your work.
                Keep track of it really wisely. 
                If you need to visualize your informations or modify them, click at the following link.
            </p>
            <button className="submitBTN" onClick={(e) => sendToPayment()}>Edit account</button>
        </section>
    )
}

export default AccountPreview;