// Global Imports
import { useContext } from "react";
import {MdOutlineDragIndicator} from "react-icons/md";

// Local Imports
// Context
import { menuContext } from "../menu";
// Types
import Item from "../../types/item";

function Food(props: {food: Item}) {
    const {selectedItem, setSelectedItem} = useContext(menuContext);

    const handleItemClick = () => {
        setSelectedItem(props.food.id);
    }

    return (
        <div className={selectedItem === props.food.id ? "category activeItem":"category"}
        onClick={() => handleItemClick()}>
            <div className="alwaysActiveCategory">
                <MdOutlineDragIndicator className="dragIcon" />
                <p>{props.food.name}</p>
            </div>
        </div>
    )
}

export default Food;