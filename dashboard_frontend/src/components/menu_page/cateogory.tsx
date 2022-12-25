// Global imports
import { useContext } from "react";
import {MdOutlineDragIndicator} from "react-icons/md";

// Local imports
// Context
import { menuContext } from "../menu";
// Types
import Category from "../../types/category";

function CategoryItem(props:{category:Category}) {
    const {selectedCategory, setSelectedCategory} = useContext(menuContext);

    const handleCategoryClick = () => {
        if (selectedCategory === props.category.id) {
            setSelectedCategory(-1);
            return;
        }
        setSelectedCategory(props.category.id);
    }

    const changeIcon = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        console.log("Change icon");
    }

    return (
        <div className={selectedCategory === props.category.id ? "category activeCategory":"category"}
            onClick={() => handleCategoryClick()}>
            <div className="alwaysActiveCategory">
                <MdOutlineDragIndicator className="dragIcon" />
                <p>{props.category.name}</p>
            </div>

            <aside style={{display: selectedCategory === props.category.id ? "flex": "none"}}>
                <div className="iconModifier">
                    <img src={`/plates/food_${props.category.iconId}.svg`} alt="Category cover" />
                    <button onClick={(e) => changeIcon(e)}>Change cover</button>
                </div>
                <div className="manageCategory">
                    <button>Hide Category</button>
                    <button>Delete Category</button>
                </div>
            </aside>
        </div>
    )
}

export default CategoryItem;