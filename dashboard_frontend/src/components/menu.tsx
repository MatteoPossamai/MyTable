// Global Imports
import { useState, createContext, useEffect } from "react";

// Local imports
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
    const [update, setUpdate] = useState(false);

    // fetching categories from the server
    useEffect(() => {
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[4];
        let token: any = localStorage.getItem("token");
        fetch(`${base_link}/category/restaurant_category/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            }})
        .then((res) => {
            if (res.status === 403){
                window.location.href = "/login";
            }
            return res.json();
        }).then((data) => {
            setCategories(data.categories.sort((a: any, b:any) => a.number-b.number));
        }).catch((err) => {
            console.log(err);
        })

    }, [base_link, update]);

    // fetching items from the server
    useEffect(() => {
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[4];
        let token: any = localStorage.getItem("token");
        fetch(`${base_link}/item/restaurant_item/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            }})
        .then((res) => {
            if (res.status === 403){
                window.location.href = "/login";
            }
            return res.json();
        }).then((data) => {
            setCategories(data.items.sort((a: any, b:any) => a.number-b.number));
        }).catch((err) => {
            console.log(err);
        })

    }, [base_link, update]);

    return (
        <menuContext.Provider value={{categories, setCategories, items, setItems,
                                    selectedCategory, setSelectedCategory, selectedItem, setSelectedItem,
                                    update, setUpdate}}>
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