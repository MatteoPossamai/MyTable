// Global Imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Local Imports
// Types
import Restaurant from '../types/restaurant';

function MiddlePage(){
    let history = useNavigate();
    const fake_restaurant:Restaurant = {
        id: -1,
        name: "Loading...",
        owner: "fake@gmail.com",
        description: "123456789",
        phone: "123456789",
        location: "Via Roma, 1",
    }
    const [restaurant, setRestaurant] = useState<Restaurant>(fake_restaurant);

    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let currentUrl = window.location.href;
    let id = currentUrl.split("/")[4];

    useEffect(() => {
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[4];
        fetch(`${base_link}/restaurant/${id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            if (res.status === 403 || res.status === 400 || res.status === 404){
                history("/error");
            }
            return res.json();
        }).then((data) => {
            setRestaurant(data.restaurant);
        }).catch((err) => {
            console.log(err);
        })
    }, [base_link, history]);

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