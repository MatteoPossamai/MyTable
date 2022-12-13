// Global Imports
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Local Imports
// Types
import Restaurant from '../types/restaurant';

// Fake data
import restaurants from '../fake_data.json'

function MiddlePage(){

    // Get the id from the url
    const { id } = useParams<{id: string}>();
    const identificationNumber:number = Number(id);

    const allRestaurants:Restaurant[] = restaurants["restaurants"];
    let restaurant: Restaurant = allRestaurants.filter((restaurant:Restaurant) => restaurant.id === identificationNumber)[0];
    const fake_restaurant:Restaurant = {
        id: -1,
        name: "-1",
        plan: -1,
        email: "fake@gmail.com",
        password: "123456789",
        telephone: "123456789",
        location: "Via Roma, 1",
    }

    if(restaurant === undefined){
        restaurant = fake_restaurant;
    }

    // State and history
    let history = useNavigate();

    useEffect(() => {
        if(restaurant === fake_restaurant){
            history('/notfound');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='middlePage'>
            <h1>Benvenuto in <br /><br />{restaurant.name}</h1>
            <p>Stai per accedere al nostro catalogo di cibi e bevande</p>
            <p>Clicca per iniziare... e goditi il buon cibo</p>
            <button className='submission' onClick={()=>history(`/mytable/${id}`)}>Inizia</button>
        </div>
    )
}

export default MiddlePage;