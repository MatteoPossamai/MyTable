// Global imports
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from 'react-icons/md';
import { BsFillXCircleFill } from 'react-icons/bs';

// Local imports
// Components
import Header from './header';
import ItemComponent from './itemComponent';
import Footer from './footer';
// Types
import Item from '../types/item';
import Restaurant from '../types/restaurant';
import Category from '../types/category';
// Other
import data from '../faker.json';
import restaurants from '../fake_data.json'
import categories from '../fake_categories.json';

function Base(){
    // setting up basic variables given by the environment
    let min_order_plan:number = Number(process.env.REACT_APP_MIN_ORDER_PLAN);

    // Get the id from the url
    const { id } = useParams<{id: string}>();
    const identificationNumber:number = Number(id);
    
    // API restaurant of faker in production
    const allRestaurants:Restaurant[] = restaurants["restaurants"];
    let fake:boolean = false;
    let restaurant: Restaurant = allRestaurants.filter((restaurant:Restaurant) => restaurant.id === identificationNumber)[0];
    const fake_restaurant: Restaurant = {"email": "fake", "id": 0, "name": "fake", "plan": 0, "password" : "fake", 
                                "telephone": "fake", "location": "fake"};

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
    function handleClick(category:Category){
        setActiveCategory(category.id);
    }

    // API items list of the restaurant or faker in production
    const items:Item[] = data["products"];
    let itemsByCategory:Item[] = items.filter((item:Item) => item.category === activeCategory);

    return (
        <div className="flex-wrapper">
            {/* Header */}
            <Header name={restaurant.name} />

            {/* NavBar for categories */}
            <nav className="categories">
                { categories["categories"].map((category:Category) => 
                    <button key={category.id} className="smallButton" id={category.id === activeCategory ? "activeSmallButton" : ""}
                    onClick={() => handleClick(category)}>{category.name}</button>
                ) }
            </nav>

            {/* Category Name */}
            <h2 className='categoryTitle'>{ allCategories.filter((category:Category) => (category.id === activeCategory))[0].name }</h2>

            {/* All Products to display */}
            <main className="products">
                {itemsByCategory.length === 0 ? (
                    <div className="noProducts">
                        
                        <h1 className="empty"> <BsFillXCircleFill />  Non esistono prodotti con queste caratteristiche</h1>
                    </div>
                ):(
                    itemsByCategory.map((item:Item) => {
                        return (
                            <ItemComponent key={item.id} item={item} restaurant={restaurant} />
                        )
                    })
                )}
            </main>

            {/* Cart Icon */}
            <MdOutlineShoppingCart style={{display: restaurant.plan >= min_order_plan ? 'visible' : 'none'}} className='cartIcon' />

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Base;