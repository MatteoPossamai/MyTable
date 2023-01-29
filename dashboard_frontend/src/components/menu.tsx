// Global Imports
import { useState, createContext, useEffect } from "react";
import axios from "axios";

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
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    // state for the categories and items
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);

    // state for the selected category
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? 0 : null);
    const [selectedItem, setSelectedItem] = useState<number>(-1);

    // fetching categories from the server
    useEffect(() => {
        axios.get(`${base_link}/restaurant_category/<int:pk>/`,{
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token")
            }
        })
        .then((res) => {
            setCategories(res.data.sort((a: any, b:any) => a.number-b.number));
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    // fetching items from the server
    useEffect(() => {
        axios.get(`${base_link}/restaurant_item/<int:pk>/`,{
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token")
            }
        })
        .then((res) => {
            setItems(res.data.sort((a: any, b:any) => a.number-b.number));
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <menuContext.Provider value={{categories, setCategories, items, setItems,
                                    selectedCategory, setSelectedCategory, selectedItem, setSelectedItem}}>
        <h1 className="topHeading">Menu'</h1>
        <div className="menu-container">
                <Categories />
                
                <Items />

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