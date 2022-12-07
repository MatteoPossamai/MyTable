// Global imports
import { useState } from 'react';
import { useParams } from "react-router-dom";
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
    const restaurant: Restaurant = allRestaurants.filter((restaurant:Restaurant) => restaurant.id === identificationNumber)[0];

    // API categories of faker in production
    const allCategories:Category[] = categories["categories"];
    allCategories.sort((a:Category, b:Category) => a.number - b.number);

    // State
    const [activeCategory, setActiveCategory] = useState<number>(allCategories[0].id);
    const [searchText, setSearchText] = useState<string>("");

    // Button function
    function handleClick(category:Category){
        setActiveCategory(category.id);
    }

    function handleChange(e:any){
        setSearchText(e.target.value);
    }

    // API items list of the restaurant or faker in production
    const items:Item[] = data["products"];
    const condition: boolean = searchText.length > 0 ? true : false;
    let itemsByCategory:Item[] = items.filter((item:Item) => item.category === activeCategory);
    itemsByCategory = condition ? itemsByCategory.filter((item:Item) => item.name.toLowerCase().includes(searchText.toLowerCase())) : itemsByCategory;

    return (
        <div className="flex-wrapper">
            {/* Header */}
            <Header name={restaurant.name} />
            <input type="text" className="searchBar" placeholder="Search" value={searchText} onChange={(e) => handleChange(e)} />

            {/* NavBar for categories */}
            <nav className="categories">
                { categories["categories"].map((category:Category) => 
                    <button key={category.id} className="category" id={category.id === activeCategory ? "active" : ""}
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