// Global imports 
import { useContext } from "react";
import { FiEdit2 } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";

// Local imports
// Types
import Category from "../types/category";
// Context
import {menuContext} from "./menu";

function SingleCategory(props: {category: Category}) {
    let category = props.category;
    // getting the selected category from the context
    const {selectedCategory, setSelectedCategory} = useContext(menuContext);

    // changing the selected category
    let changeSelectedCategory = () => {
        setSelectedCategory(category.id);
    }

    return (
        <div onClick={changeSelectedCategory} className={selectedCategory === category.id ? "category active" : "category"}>
            <h3>{category.name}</h3>
            <aside >
                <BiTrash className="icon2" />
                <FiEdit2 className="icon2" />
            </aside>
        </div>
    )
}

export default SingleCategory;