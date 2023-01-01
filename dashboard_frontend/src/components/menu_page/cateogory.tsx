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
    const {categories, setCategories} = useContext(menuContext);
    const {selectedCategory, setSelectedCategory} = useContext(menuContext);
    const [update, setUpdate] = useState(true);
    const [isSetting, setIsSetting] = useState(false);

    // Get from .env file the number of icons
    let icon_plates:number = Number(process.env.REACT_APP_PLATES_ICONS);

    let category = categories.find((category:Category) => category.id === props.category.id);

    // Handle category click
    const handleCategoryClick = () => {
        if (selectedCategory === category.id) {
            setSelectedCategory(-1);
            return;
        }
        setSelectedCategory(category.id);
    }

    // Change icon
    const changeIcon = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsSetting(!isSetting);
    }

    // Hide/show category
    const hideCategory = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setCategories(categories.map((category:Category) => {
            if (category.id === props.category.id) {
                category.isActive = !category.isActive;
            }
            return category;
        }));
        // Call the API to update the category
        setUpdate(!update);
    }

    // Delete category
    const deleteCategory = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        // Call the API to delete the category
        setUpdate(!update);
    }

    // Change category icon
    const changeCategoryIcon = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, icon:number) => {
        e.stopPropagation();
        // Call the API to update the category
        setIsSetting(!isSetting);
        setCategories(categories.map((category:Category) => {
            if (category.id === props.category.id) {
                category.iconId = icon+1;
            }
            return category;
        }));
        setUpdate(!update);
    }



    return (
        <div className={selectedCategory === category.id ? "category activeCategory":"category"}
            onClick={() => handleCategoryClick()} 
            style={{backgroundColor: category.isActive ? "" : "#FF7B7B"}}>
                
            <div className="alwaysActiveCategory" style={{alignItems: props.category.id === selectedCategory ? "center" : "normal"}}>
                <MdOutlineDragIndicator className="dragIcon" />
                <p style={{display: props.category.id === selectedCategory ? "none" : "block" }}>{category.name}</p>
            </div>

            <aside style={{display: selectedCategory === category.id ? "flex": "none"}}>
                <div className="iconModifier">
                    <img src={`/plates/food_${category.iconId}.svg`} alt="Category cover" />
                    <button onClick={(e) => changeIcon(e)}>Change cover</button>
                </div>

                <div className="changeCategoryIcon" style={{display: isSetting ? "flex" : "none" }}>
                    {Array.from(Array(icon_plates).keys()).map((icon) => {
                        return (
                            <img key={icon} src={`/plates/food_${icon+1}.svg`} alt="Category cover"
                            onClick={(e) => changeCategoryIcon(e, icon)} />
                        )
                    })
                    }
                </div>

                <div className="manageCategory" style={{display: isSetting ? "none" : "flex" }}>
                    <button onClick={(e) => hideCategory(e) }> <BiHide className="hideIcon" 
                            style={{backgroundColor: categories.find((category: Category) => category.id === props.category.id).isActive ? "#FF7B7B" : "#76CB8E"}} /> 
                        {category.isActive ? "Hide Category" : "Show Category"}
                    </button>
                    <button onClick={(e) => deleteCategory(e)}> <BsTrash className="deleteIcon" /> Delete Category</button>
                </div>
            </aside>
        </div>
    )
}

export default CategoryItem;