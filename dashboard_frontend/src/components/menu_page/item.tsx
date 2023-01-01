// Global Imports
import { useContext } from "react";
import {MdOutlineDragIndicator} from "react-icons/md";
import { FaPen } from "react-icons/fa";

// Local Imports
// Context
import { menuContext } from "../menu";
// Types
import Item from "../../types/item";

function Food(props: {food: Item}) {
    const {selectedItem, setSelectedItem} = useContext(menuContext);

    const handleItemClick = () => {
        if (selectedItem === props.food.id) {
            setSelectedItem(-1);
            return;
        }
        setSelectedItem(props.food.id);
    }

    return (
        <div className={selectedItem === props.food.id ? "category itemOn":"category"}
        onClick={() => handleItemClick()}>
            <div className="alwaysActiveCategory" style={{alignItems: props.food.id === selectedItem ? "center" : "normal"}}>
                <MdOutlineDragIndicator className="dragIcon" />
                {selectedItem === props.food.id ?
                <div className="onElement">
                    <div>
                        <p>{props.food.name}</p>
                        <p>{props.food.description}</p>
                        <p className="priceP">€{props.food.price}</p>
                    </div>
                    <FaPen className="editIcon" />
                </div>
                :
                <p>{props.food.name}</p>
                }
            </div>
        </div>
    )
}

export default Food;