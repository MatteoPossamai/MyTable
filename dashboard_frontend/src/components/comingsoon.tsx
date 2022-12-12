// Global imports
import {AiOutlineInstagram} from 'react-icons/ai';  
import {FiFacebook} from 'react-icons/fi';
import {FaTwitter} from 'react-icons/fa';

function ComingSoon() {

    return <div className="soon">
        <h1>...Coming soon...</h1>
        <aside>Questa funzionalita' non e' ancora disponibile, ma lo sara' presto.
            Se sono te la vuoi perdere quando uscira', tieni d'occhio la newsletter
            e i nostri social.

            <br />
            <br />
            <p className="social">
                <AiOutlineInstagram />
                Instagram: <a href="https://www.instagram.com/mytableofficial/">@mytableofficial</a>
                <br />
                <FiFacebook />
                Facebook: <a href="https://www.facebook.com/mytableofficial">MyTable</a>
                <br />
                <FaTwitter />
                Twitter: <a href="https://twitter.com/mytableofficial">@mytableofficial</a>
                <br />
            </p>
        </aside>

    </div>

}

export default ComingSoon;