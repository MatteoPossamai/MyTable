// Global imports
import { useContext, useState } from "react";
import {MdOutlineDragIndicator} from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

// Local imports
// Context
import { menuContext } from "../menu";
// Types
import Category from "../../types/category";

function CategoryItem(props:{category:Category}) {
    const {selectedCategory, setSelectedCategory} = useContext(menuContext);
    const [update, setUpdate] = useState(true);

    let category = props.category;

    // Handle category click
    const handleCategoryClick = () => {
        if (selectedCategory === category.id) {
            setSelectedCategory(-1);
            return;
        }
        setSelectedCategory(category.id);
    }

    // CHange icon
    const changeIcon = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        console.log("Change icon");
    }

    // Hide/show category
    const hideCategory = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        console.log("Hide category");
        category.isActive = !category.isActive;
        // Call the API to update the category
        setUpdate(!update);
    }

    // Delete category
    const deleteCategory = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        console.log("Delete category");
        // Call the API to delete the category
        setUpdate(!update);
    }


    return (
        <div className={selectedCategory === category.id ? "category activeCategory":"category"}
            onClick={() => handleCategoryClick()} 
            style={{backgroundColor: category.isActive ? "" : "#FF7B7B"}}>
            <div className="alwaysActiveCategory">
                <MdOutlineDragIndicator className="dragIcon" />
                <p>{category.name}</p>
            </div>

            <aside style={{display: selectedCategory === category.id ? "flex": "none"}}>
                <div className="iconModifier">
                    <img src={`/plates/food_${category.iconId}.svg`} alt="Category cover" />
                    <button onClick={(e) => changeIcon(e)}>Change cover</button>
                </div>
                <div className="manageCategory">
                    <button onClick={(e) => hideCategory(e) }> <BiHide className="hideIcon" /> 
                        {category.isActive ? "Hide Category" : "Show Category"}
                    </button>
                    <button onClick={(e) => deleteCategory(e)}> <BsTrash className="deleteIcon" /> Delete Category</button>
                </div>
            </aside>
        </div>
    )
}

export default CategoryItem;