// Global Imports
import { useState } from "react";

function Contact() {
    // Create a state to handle the form
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    return (
        <section className="settingsSection contactSection">
            <h2>Contatti</h2>
            <aside>
            <div className="contactContainer">
                <p>Se hai bisogno di assistenza, non esitare a contattarci</p>
                <ul>
                    <li>Telefono: +39 346 212 3657</li>
                    <li>Email:
                        <a href="mailto: mytable.business@gmail.com"> mytable.business@gmail.com </a>
                    </li>
                </ul>
                <p>Alternativamente, compila il form qui a fianco per aprire un ticket ufficiale</p>
            </div>

            <form className="generalForm">
                <h3>Apri un Ticket</h3>
                <label htmlFor="subject">Oggetto</label>
                <input type="text" name="subject" placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} />
                <label htmlFor="message">Messaggio</label>
                <textarea name="message" placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button type="submit">Manda</button>
            </form>
            </aside>
        </section>
    )
}

export default Contact;