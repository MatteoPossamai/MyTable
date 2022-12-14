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
            <img src={`/other/Home.svg`} alt="home" className="middleImage1" />
            <h1>{restaurant.name}</h1>
            <button className='bigButton' onClick={()=>history(`/mytable/${id}`)}>Get Started</button>
            <img src={`/other/Home.svg`} alt="home" className="middleImage2" />
        </div>
    )
}

export default MiddlePage;