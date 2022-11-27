// Global imports
import { useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

// Local imports
// Components
import Header from './header';
import Footer from './footer';

import Restaurant from '../types/restaurant';
import restaurants from '../fake_data.json'

function InitialForm(){
    // Get the id from the url
    const { id } = useParams<{id: string}>();
    const identificationNumber:number = Number(id);

    // State and history
    const [tableNumber, setTableNumber] = useState<number>(1);
    const [bringsNumber, setBringsNumber] = useState<number>(1);
    let history = useNavigate();

    // API restaurant of faker in production
    const allRestaurants:Restaurant[] = restaurants["restaurants"];
    const restaurant: Restaurant = allRestaurants.filter((restaurant:Restaurant) => restaurant.id === identificationNumber)[0];

    const goToOrderPage = (e:any) => {
        e.preventDefault();
        history(`/ordination/${id}?talbe=${tableNumber}&brings=${bringsNumber}`);
    }

    return (
        <>
            <Header name={restaurant.name} />
            <form className="initialForm" onSubmit={(e)=>goToOrderPage(e)}>
                <label className='labelsN'>Enter your table number:</label>
                <input className='enterN' type={'number'} placeholder={'Enter table number'} value={tableNumber} onChange={(e)=> setTableNumber(Number(e.target.value)) } />         
                
                <div style={{display: restaurant.plan >= 2 ? 'fixed' : 'none'}} className="brings">
                    <label className='labelsN'>Enter the number of brings:</label>
                    <input className='enterN' type={'number'} placeholder={'Brings number'} value={bringsNumber} onChange={(e)=> setBringsNumber(Number(e.target.value)) } />
                </div>

                <button type={'submit'} className='submission'>Start your ordination</button>

            </form>
            <Footer />
        </>
    )
}

export default InitialForm;