// Global imports
import { useContext, useState } from "react";
import {AiOutlineSearch} from "react-icons/ai";

// Local imports
// Context
import { menuContext } from "../menu";
// Components
import CategoryItem from "./cateogory";
// Types
import Category from "../../types/category";

function Categories(){
    const [search, setSearch] = useState("");
    const {categories} = useContext(menuContext);

    // Handle modification
    const handleModification = (e: any) => {
        setSearch(e.target.value);
    }

    // Confirm changes
    const confirmChanges = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // Call the API to update the categories
        let data = {
            categories: categories
        }

        console.log(data)
    }

    let filteredCategories = categories.filter((category:Category) => {
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
                {filteredCategories.map((category: Category) => {
                    return (
                        <CategoryItem key={category.id} category={category} />
                    )
                })}
            </div>
            <button onClick={(e) => confirmChanges(e)} className="submitBTN bottomButton">Confirm changes</button>
        </div>
    )
}

export default Categories;