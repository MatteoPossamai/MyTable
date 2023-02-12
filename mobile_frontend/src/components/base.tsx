// Global imports
import { useState, useEffect, createContext, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { BsFillXCircleFill } from 'react-icons/bs';

// Local imports
// Components
import Header from './header';
import ItemComponent from './itemComponent';
import Ordered from './ordered';
import Navbar from './navBar';
// Types
import Item from '../types/item';
import Restaurant from '../types/restaurant';
import Category from '../types/category';

// Context
let orderedContext = createContext<any>([]);

function Base(){
    // Setting up rnv variables and utilities 
    let min_order_plan:number = Number(process.env.REACT_APP_MIN_ORDER_PLAN);
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let history = useNavigate();
    
    // API restaurant of faker in production
    const fake_restaurant: Restaurant = {"owner": "fake", "id": 0, "name": "fake", "phone": "123", "location": "fake", "description": "random"};

    // Get the restaurant from the API
    const [restaurant, setRestaurant] = useState<Restaurant>(fake_restaurant);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[5];
        fetch(`${base_link}/restaurant/${id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            /*
            if (res.status === 403 || res.status === 400){
                window.location.href = "/error";
            }
            */
            return res.json();
        }).then((data) => {
            console.log(data);
            setRestaurant(data.restaurant);
        }).catch((err) => {
            console.log(err);
        })
    }, [base_link, history]);

    /*
    useEffect(() => {
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[4];
        fetch(`${base_link}/category/restaurant_category/${id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            if (res.status === 403 || res.status === 400){
                window.location.href = "/error";
            }
            return res.json();
        }).then((data) => {
            setAllCategories(data.categories.sort((a: any, b:any) => a.number-b.number));
        }).catch((err) => {
            console.log(err);
        })
        
    }, [base_link, history]);
    */

    const [activeCategory, setActiveCategory] = useState<number>(0);
    let itemsByCategory:Item[] = items.filter((item:Item) => item.category === activeCategory);

    // Button function
    const handleClick = useCallback((category:Category) => {
        setActiveCategory(category.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory]);

    const [orderedItems, setOrderedItems] = useState<Item[]>([]);
    const [quantities, setQuantities] = useState<number[]>([]);

    return (
        <>
            <orderedContext.Provider value={{orderedItems, setOrderedItems, quantities, setQuantities}}>
                {/* Header */}
                <Header name={restaurant.name} />

                {/* NavBar for categories */}
                <Navbar categories={allCategories} activeCategory={activeCategory} handleClick={handleClick} 
                    note={false} />

                <hr className='separator' />

                {/* All Products to display */}
                <main className="products">
                    {itemsByCategory.length === 0 ? (
                        <div className="noProducts">
                            
                            <h2 className="empty"> <BsFillXCircleFill />  Non esistono prodotti con queste caratteristiche</h2>
                        </div>
                    ):(
                        itemsByCategory.map((item:Item) => {
                            return (
                                <ItemComponent key={item.id} item={item} restaurant={restaurant} />
                            )
                        })
                    )}
                </main>

                {/* Order list in case */}
                {restaurant.plan.client_order >= min_order_plan ? (
                    <Ordered restaurant={restaurant} />
                ):(
                    <div></div>
                )}
            </orderedContext.Provider>
        </>
    )
}

export default Base;
export { orderedContext };