// Global imports
import { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

// Local imports
// Components
import Header from './header';

import Restaurant from '../types/restaurant';
import restaurants from '../fake_data.json'

function InitialForm(){
    // setting up basic variables given by the environment
    let min_order_plan:number = Number(process.env.REACT_APP_MIN_ORDER_PLAN);

    // Get the id from the url
    const { id } = useParams<{id: string}>();
    const identificationNumber:number = Number(id);

    // State and history
    const [tableNumber, setTableNumber] = useState<number>(1);
    let history = useNavigate();

    // API restaurant of faker in production
    const allRestaurants:Restaurant[] = restaurants["restaurants"];
    let restaurant: Restaurant = allRestaurants.filter((restaurant:Restaurant) => restaurant.id === identificationNumber)[0];
    const fake_restaurant:Restaurant = {
        id: -1,
        name: "-1",
        plan: {"menu_plan": 1, "image_number": 0, "client_order": 0, "waiter_order": 0},
        email: "fake@gmail.com",
        password: "123456789",
        telephone: "123456789",
        location: "Via Roma, 1",
    }
    if(restaurant === undefined){
        restaurant = fake_restaurant;
    }

    useEffect(() => {
        // when loaded up, if the restaurant has a plan < 2, the bringsNumber is set to 1
        // and he is sent to the menu page, as the restaurant has only the main plan
        // and only lets see the menu
        if(restaurant.plan.client_order < min_order_plan){
            history(`/mytable/menu/${id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const goToOrderPage = (e:any) => {
        e.preventDefault();
        history(`/mytable/menu/${id}?table=${tableNumber}`);
    }

    return (
        <>
            <Header name={restaurant.name} />
            <form className="initialForm" onSubmit={(e)=>goToOrderPage(e)}>
                <label className='labelsN'>Inserire il numero del tavolo:</label>
                <input className='enterN' type={'number'} placeholder={'Numero del tavolo'} value={tableNumber} onChange={(e)=> setTableNumber(Number(e.target.value)) } /> 

                <button type={'submit'} className='bigButton initialFormButton'>Vai al menu'</button>

            </form>
        </>
    )
}

export default InitialForm;