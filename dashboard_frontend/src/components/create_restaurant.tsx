// Global Imports
import { useState } from 'react';

function CreateRestaurant() {
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    let token: any = localStorage.getItem("token");

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [restaurantPhone, setRestaurantPhone] = useState('');
    const [restaurantDescription, setRestaurantDescription] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log("submit")
        let data = {
            "name": restaurantName,
            "location": restaurantAddress,
            "phone": restaurantPhone,
            "description": restaurantDescription
        }
        fetch(`${base_link}/restaurant/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            },
            body: JSON.stringify(data)
            }).then(function(response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            return response.json();
          }).then(function(data) {
            let id = data.id;
            window.location.href = `/dashboard/${id}`;
          });
    }

    return (
        <div className="createRestaurant">
            <h1>Create Restaurant</h1>
            <p>Ora che hai creato il tuo account in MyTable, e' giunto il momento di creare il 
                tuo ristorante. Inserisci i tuoi dati, cosi' che tu abbia le tue informazioni
                a disposizione dei tuoi clienti. 
            </p>
            <form className="generalForm resForm" onSubmit={(e) => handleSubmit(e)}>
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