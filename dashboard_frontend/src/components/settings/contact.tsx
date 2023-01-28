// Global Imports
import { useState } from "react";

function Contact() {
    // Create a state to handle the form
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    return (
        <section className="settingsSection contactSection">
            <h2>Contact</h2>
            <aside>
            <div className="contactContainer">
                <p>If you need any assistance, don't exitate to contact us.
                Here are our contacts</p>
                <ul>
                    <li>Phone: +39 123 456 789</li>
                    <li>Email:
                        <a href="mailto: prova@gmail.com"> prova@gmail.com </a>
                    </li>
                </ul>
                <p>Otherwise, fill the form to open a ticket. We will reply back as soon as possible</p>
            </div>

            <form className="generalForm">
                <h3>Open a Ticket</h3>
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} />
                <label htmlFor="message">Message</label>
                <textarea name="message" placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button type="submit">Send</button>
            </form>
            </aside>
        </section>
    )
}

export default Contact;