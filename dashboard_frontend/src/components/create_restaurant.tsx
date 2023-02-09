// Global Imports
import { useState } from 'react';

function CreateRestaurant() {

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [restaurantPhone, setRestaurantPhone] = useState('');
    const [restaurantDescription, setRestaurantDescription] = useState('');

    return (
        <div className="createRestaurant">
            <h1>Create Restaurant</h1>
            <p>Ora che hai creato il tuo account in MyTable, e' giunto il momento di creare il 
                tuo ristorante. Inserisci i tuoi dati, cosi' che tu abbia le tue informazioni
                a disposizione dei tuoi clienti. 
            </p>
            <form className="generalForm resForm">
                <label htmlFor="restaurantName">Restaurant Name</label>
                <input type="text" value={restaurantName} id="restaurantName" onChange={(e) => setRestaurantName(e.target.value)} />
                <label htmlFor="restaurantAddress">Restaurant Address</label>
                <input type="text" value={restaurantAddress} id="restaurantAddress" onChange={(e) => setRestaurantAddress(e.target.value)} />
                <label htmlFor="restaurantPhone">Restaurant Phone</label>
                <input type="text" value={restaurantPhone} id="restaurantPhone" onChange={(e) => setRestaurantPhone(e.target.value)} />
                <label htmlFor="restaurantDescription">Restaurant Description</label>
                <textarea value={restaurantDescription} id="restaurantDescription" onChange={(e) => setRestaurantDescription(e.target.value)} />
                <button type="submit">Create Restaurant</button>
            </form>
        </div>
    )
}

export default CreateRestaurant;