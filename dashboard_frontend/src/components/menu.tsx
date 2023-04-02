// Global Imports
import { useState, createContext, useEffect } from "react";

// Local imports
// Components
import Categories from "./menu_page/categories";
import Items from "./menu_page/items";
import CreateItem from "./menu_page/create_item";
import CreateCategory from "./menu_page/create_category";
import Popup from "./popup/popup";
import DonePopup from "./menu_page/donePopup";
import Banner from "./menu_page/banner";
import ImagePopup from "./menu_page/imagePopup";
// Styles
import "../styles/menu.css";

let menuContext = createContext<any>(0);

function Menu(){
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    // check if the user payid for the service
    const [auth, setAuth] = useState<any>({"client_order": false, "image_menu": false, "base_menu": true , "waiter_order": false});
    
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
            setAuth(data.auth);
        }).catch((err) => {
            console.log(err);
        })
    }, [base_link]);


    // state for the categories and items
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [popupAwake, setPopupAwake] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [popupFollowingFunction, setPopupFollowingFunction] = useState(() => {});
    const [donePopupvisible, setDonePopupVisible] = useState(false);
    const [donePopupText, setDonePopupText] = useState("");

    // state for the selected category
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? 0 : null);
    const [selectedItem, setSelectedItem] = useState<number>(-1);
    const [update, setUpdate] = useState(false);
    const [imagePopup, setImagePopup] = useState(false);

    // fetching categories from the server
    useEffect(() => {
        // Get the ID of the restaurant from the url
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
            if (res.status === 403 || res.status === 400){
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
            if (res.status === 403 || res.status === 400){
                window.location.href = "/login";
            }
            return res.json();
        }).then((data) => {
            setItems(data.items.sort((a: any, b:any) => a.number-b.number));
        }).catch((err) => {
            console.log(err);
        })

    }, [base_link, update]);

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setSeconds(seconds + 1);
        setDonePopupVisible(false);
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    return (
        <menuContext.Provider value={{categories, setCategories, items, setItems,
                                    selectedCategory, setSelectedCategory, selectedItem, setSelectedItem,
                                    update, setUpdate, popupAwake, setPopupAwake, popupMessage, setPopupMessage,
                                    popupTitle, setPopupTitle, popupFollowingFunction, setPopupFollowingFunction,
                                    setDonePopupText, setDonePopupVisible, auth, imagePopup, setImagePopup}}>
        <Banner visible={auth.base_menu || auth.image_menu ? false : true } />
        <h1 className="topHeading">Menu'</h1>
        <div className="menu-container">
                <Categories />
                
                <Items />

                <section className="create-items">
                    <CreateCategory />
                    <CreateItem />
                </section>
        </div>

        <ImagePopup active={imagePopup} changeVisibility={setImagePopup} />

        <Popup awake={popupAwake} title={popupTitle} message={popupMessage} />
        <DonePopup text={donePopupText} visible={donePopupvisible} page="menu" />
        </menuContext.Provider>
    )
}

export default Menu;
export { menuContext };