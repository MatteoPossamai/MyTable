// Global imports
import { useState, useEffect, createContext, useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
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
// Other
import data from '../faker.json';
import restaurants from '../fake_data.json'
import categories from '../fake_categories.json';

// Context
let orderedContext = createContext<any>([]);

function Base(){
    // setting up basic variables given by the environment
    let min_order_plan:number = Number(process.env.REACT_APP_MIN_ORDER_PLAN);
    let min_client_order:number = Number(process.env.REACT_APP_MIN_CLIENT_ORDER);

    // Get the id from the url
    const { id } = useParams<{id: string}>();
    const identificationNumber:number = Number(id);
    
    // API restaurant of faker in production
    const allRestaurants:Restaurant[] = restaurants["restaurants"];
    let fake:boolean = false;
    let restaurant: Restaurant = allRestaurants.filter((restaurant:Restaurant) => restaurant.id === identificationNumber)[0];
    const fake_restaurant: Restaurant = {"email": "fake", "id": 0, "name": "fake", "plan": {
        "menu_plan": 1,"image_number": 0, "client_order": 0, "waiter_order": 0}, "password" : "fake", "telephone": "fake", "location": "fake"};

    if (restaurant === undefined){
        restaurant = fake_restaurant;
        fake = true;
    }

    // Navigation 
    let history = useNavigate();

    useEffect(() => {
        if (fake){
            history("/notfound");
        }
    })
    
    // API categories of faker in production
    const allCategories:Category[] = categories["categories"];
    allCategories.sort((a:Category, b:Category) => a.number - b.number);

    // State
    const [activeCategory, setActiveCategory] = useState<number>(allCategories[0].id);

    // Button function
    const handleClick = useCallback((category:Category) => {
        setActiveCategory(category.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory]);

    // API items list of the restaurant or faker in production
    const items:Item[] = data["products"];
    let itemsByCategory:Item[] = items.filter((item:Item) => item.category === activeCategory);

    const [orderedItems, setOrderedItems] = useState<Item[]>([]);
    const [quantities, setQuantities] = useState<number[]>([]);

    return (
        <>
            <orderedContext.Provider value={{orderedItems, setOrderedItems, quantities, setQuantities}}>
                {/* Header */}
                <Header name={restaurant.name} />

                {/* NavBar for categories */}
                <Navbar categories={allCategories} activeCategory={activeCategory} handleClick={handleClick} 
                    note={min_order_plan <= restaurant.plan.client_order ? true : false} />

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