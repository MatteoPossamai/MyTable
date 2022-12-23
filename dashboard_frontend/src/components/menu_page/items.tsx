// Global imports
import {AiOutlineSearch} from "react-icons/ai";
import { useState } from "react";

// Local imports
// Types
import Item from "../../types/item";

function Items(props:{items:Item[]}){
    const [search, setSearch] = useState("");

    const handleModification = (e: any) => {
        setSearch(e.target.value);
    }

    let filteredItems = props.items.filter((item) => {
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
                {filteredItems.map((item) => {
                    return (
                        <div className="category">
                            <p>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Items;