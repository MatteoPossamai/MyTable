// Global Imports
import { useState, createContext } from "react";

// Local imports
import data from "../fake_categories.json";
import faker from "../faker.json";
// Components
import Categories from "./menu_page/categories";
import Items from "./menu_page/items";
import CreateItem from "./menu_page/create_item";
import CreateCategory from "./menu_page/create_category";
// Styles
import "../styles/menu.css";

let menuContext = createContext<any>(0);

function Menu(){
    // fetching data from the fake server
    const [categories, setCategories] = useState(data.categories);
    categories.sort((a, b) => a.number-b.number);

    // state for the selected category
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? 0 : null);
    const [selectedItem, setSelectedItem] = useState<number>(-1);

    let items = faker.products;
    items = items.filter(item => item.category === selectedCategory);

    return (
        <menuContext.Provider value={{categories, setCategories, selectedCategory, setSelectedCategory, selectedItem, setSelectedItem}}>
        <h1 className="topHeading">Menu'</h1>
        <div className="menu-container">
                <section className="menu">
                    <Categories />
                    <Items items={items} />
                </section>

                <section className="create-items">
                    <CreateCategory />
                    <CreateItem />
                </section>
        </div>
        </menuContext.Provider>
    )
}

export default Menu;
export { menuContext };