// Global import 
import { BiLock } from "react-icons/bi";

function Banner(props: {visible: boolean}){
    return (
        <div className="banner" style={{display: props.visible ? "block" : "none"}}>
            <BiLock className="blockIcon" />
            <h1>Piano non attivo</h1>

            <p>Non hai attivo il piano per poter utilizzare il menu, quindi non puoi usufruire di questa feature</p>

            <p>Per fortuna, puoi attivarla in un attimo. Clicca il bottone qui sotto, e verrai portato 
                alla pagina per attivarla.
            </p>

            <button className="submitBTN" onClick={() => {
                // Get id from url
                let currentUrl = window.location.href;
                let id = currentUrl.split("/")[4];
                window.location.href = `/payment/${id}`;
            }}>Attiva piano</button>
        </div>
    )
}

export default Banner;