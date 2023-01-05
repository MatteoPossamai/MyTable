// Global Imports
import { useContext, useState } from "react";
import {MdOutlineDragIndicator} from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { Draggable } from "@hello-pangea/dnd";

// Local Imports
// Context
import { menuContext } from "../menu";
// Types
import Item from "../../types/item";

function Food(props: {food: Item, idx: number}) {
    const {selectedItem, setSelectedItem} = useContext(menuContext);
    const [edit, setEdit] = useState(false);

    const handleItemClick = () => {
        if (selectedItem === props.food.id) {
            setSelectedItem(-1);
            return;
        }
        setSelectedItem(props.food.id);
    }

    return (
        <>
            <Draggable key={props.food.id} draggableId={props.food.id.toString()} index={props.idx}>
                {(provided) => 
                    <div className={selectedItem === props.food.id ? "category itemOn":"category"}
                    onClick={() => handleItemClick()}
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                        <div className="alwaysActiveCategory" style={{alignItems: props.food.id === selectedItem ? "center" : "normal"}}>
                            <MdOutlineDragIndicator className="dragIcon" />
                            {selectedItem === props.food.id ?
                            <div className="onElement">
                                <div>
                                    <p>{props.food.name}</p>
                                    <p>{props.food.description}</p>
                                    <p className="priceP">€{props.food.price}</p>
                                </div>
                                <FaPen className="editIcon" onClick={(e) => {e.stopPropagation();setEdit(!edit)}} />
                            </div>
                            :
                            <p>{props.food.name}</p>
                            }
                        </div>
    
                        <div className="editItem" style={{display: edit && selectedItem === props.food.id ? "flex" : "none"}}>
                            <h1>Edit</h1>
                        </div>
                    </div>
                }
            </Draggable>
        </>
    )
}

export default Food;