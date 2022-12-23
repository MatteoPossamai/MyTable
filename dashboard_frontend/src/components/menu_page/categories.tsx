// Global imports
import { useState } from "react";
import {AiOutlineSearch} from "react-icons/ai";

// Local imports
// Types
import Category from "../../types/category";

function Categories(props:{categories:Category[]}){
    const [search, setSearch] = useState("");

    const handleModification = (e: any) => {
        setSearch(e.target.value);
    }

    let filteredCategories = props.categories.filter((category) => {
        return category.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="greyBox">
            <header className="header_menu">
                <p>All your categories</p>
                <div className="searchContainer">
                    <AiOutlineSearch className="searchIcon" />
                    <input type={"text"} placeholder={"Search"} className="searchBar" value={search} 
                        onChange={(e) => handleModification(e)} />
                </div>
            </header>

            <div className="categoriesContainer">
                {filteredCategories.map((category) => {
                    return (
                        <div className="category" draggable>
                            <p>{category.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Categories;