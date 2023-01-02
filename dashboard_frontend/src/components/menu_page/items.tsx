// Global imports
import {AiOutlineSearch} from "react-icons/ai";
import { useState, useContext } from "react";

// Local imports
// Context
import { menuContext } from "../menu";
// Components
import ItemComponent from "./item";
// Types
import Item from "../../types/item";

function Items(){
    const {items, selectedCategory} = useContext(menuContext);
    const [search, setSearch] = useState("");

    const handleModification = (e: any) => {
        setSearch(e.target.value);
    }

    let filteredItems = items.filter((item:Item)=>{
        return item.category === selectedCategory;
    }).filter((item: Item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="greyBox">
            <header className="header_menu">
                <p>Category foods</p>
                <div className="searchContainer">
                    <AiOutlineSearch className="searchIcon" />
                    <input type={"text"} placeholder={"Search"} className="searchBar" value={search} 
                        onChange={(e) => handleModification(e)} />
                </div>
            </header>

            <div className="categoriesContainer">
                {/* All the categories */}
                {filteredItems.map((item: Item) => {
                    return (
                        <ItemComponent food={item} key={item.id} />
                    )
                })}

                {/* Add item button */}
                <div className="category" style={{display: selectedCategory === -1 ? "none" : "flex"}}
                onClick={()=>{console.log("Create Item in the category")}}>
                    <p style={{margin: "15px auto"}}>Add Item in this category</p>
                </div>

                {/* Empty category placeholder */}
                <div className="category" style={{display: selectedCategory === -1 ? "flex" : "none"}}>
                    <p style={{margin: "15px auto"}}>Select a category to see the items</p>
                </div>

            </div>
        </div>
    )
}

export default Items;