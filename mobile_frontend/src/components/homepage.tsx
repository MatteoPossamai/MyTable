// Global imports
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

// Local imports
// Components
import Footer from "./footer";

function HomePage(){
    // State of the insertion bar
    const [restaurantCode, setRestaurantCode] = useState<number>(0);

    // Function to change the restaurant code
    const changeRestaurant = (e:any) => {
        e.preventDefault();
        setRestaurantCode(Number(e.target.value));
    }

    // Creation and handling of the navigation
    let history = useNavigate();

    const goToMenu = (e:any) => {
        e.preventDefault();
        history(`/mytable/${restaurantCode}`);
    }


    return (
        <div className="homeDiv">
            <h1>MyTable</h1>
            <p>
                Benvenuto in MyTable, il futuro della ristorazione.
            </p>

            <h3>Per clienti...</h3>
            <p>
                Se sei un cliente a un ristorante, puoi usare MyTable per visualizzare il menù, e 
                presto anche per ordinare direttamente dal tuo tavolo. Devi solo accedere alla pagina
                del ristorante in cui ti trovi, mediante il codice che trovi sul tavolo, o mediante
                il QR code. 
            </p>

            <h3>Visualizza menu del ristorante</h3>
            <input className="enterN" value={restaurantCode} onChange={(e)=>{changeRestaurant(e)}} type="number" placeholder="Inserisci il codice del ristorante" />
            <button className="goto" onClick={(e)=>{goToMenu(e)}}>Vai al menu</button>

            <h3>Per ristoranti...</h3>
            <p>
                Se sei un ristoratore, puoi usare MyTable per gestire il menu del tuo ristorante,
                e presto anche per gestire le prenotazioni. Devi solo registrarti, e iniziare a
                automatizzare la tua attività, a un prezzo davvero vantaggioso.
            </p>
            <Footer />
        </div>
    )
}

export default HomePage;