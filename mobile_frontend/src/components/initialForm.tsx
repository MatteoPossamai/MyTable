// Global imports
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

// Local imports
// Components
import Header from './header';
// Types
import Restaurant from '../types/restaurant';

function InitialForm(){
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    // State and history
    const [tableNumber, setTableNumber] = useState<number>(1);
    let history = useNavigate();

    // API restaurant of faker in production
    const fake_restaurant:Restaurant = {
        id: -1,
        name: "Loading...",
        owner: "fake@gmail.com",
        description: "123456789",
        phone: "123456789",
        location: "Via Roma, 1",
    }
    const [restaurant, setRestaurant] = useState<Restaurant>(fake_restaurant);
    useEffect(() => {
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[4];
        fetch(`${base_link}/restaurant/${id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            if (res.status === 403 || res.status === 400){
                window.location.href = "/error";
            }
            return res.json();
        }).then((data) => {
            setRestaurant(data.restaurant);
            if(!data.auth.client_order){
                history(`/mytable/menu/${id}`);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [base_link, history]);

    const goToOrderPage = (e:any) => {
        e.preventDefault();
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[4];
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