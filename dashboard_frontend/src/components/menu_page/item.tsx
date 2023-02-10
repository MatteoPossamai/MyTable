// Global Imports
import { useContext, useState } from "react";
import {MdOutlineDragIndicator} from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { Draggable } from "@hello-pangea/dnd";

// Local Imports
// Context
import { menuContext } from "../menu";
//Components
import HideAndDeleteButton from "./hideAndDeleteButton";
// Types
import Item from "../../types/item";

function Food(props: {food: Item, idx: number}) {
    // Get from .env file the number of icons
    let icon_plates:number = Number(process.env.REACT_APP_PLATES_ICONS);

    const {selectedItem, setSelectedItem, items, setItems} = useContext(menuContext);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(true);

    // Data states
    const [name, setName] = useState(props.food.name);
    const [description, setDescription] = useState(props.food.description);
    const [price, setPrice] = useState(props.food.price);
    const [selectedIcon, setSelectedIcon] = useState(0);

    const food = items.find((item: Item) => item.id === props.food.id);

    const handleItemClick = () => {
        if (selectedItem === props.food.id) {
            setSelectedItem(-1);
            setEdit(false);
            return;
        }
        setSelectedItem(props.food.id);
    }

    const changeItemIcon = (e: any, icon: number) => {
        e.stopPropagation();
        let newIcon = icon;
        if (newIcon > icon_plates) {
            newIcon = 1;
        }
        setSelectedIcon(newIcon);
    }

    // Item management
    const hideItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        const newItems = items.map((item: Item) => {
            if (item.id === props.food.id) {
                item.isActive = !item.isActive;
            }
            return item;
        })
        setItems(newItems);
        setUpdate(!update);
    }

    const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        // Call the API to delete the item
        setUpdate(!update);
    }

    // Confirm changes
    const submitItemChanges = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Call the API to update the item
        setEdit(false);
    }


    return (
        <>
            <Draggable key={props.food.id} draggableId={props.food.id.toString()} index={props.idx}>
                {(provided) => 
                    <div className={selectedItem === props.food.id ? "category itemOn":"category"}
                    onClick={() => handleItemClick()}
                    ref={provided.innerRef} 
                    id={food.isActive ? "":"hidden"}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                        <div className="alwaysActiveCategory" style={{alignItems: props.food.id === selectedItem ? "center" : "normal"}}>
                            <MdOutlineDragIndicator className="dragIcon" />
                            {selectedItem === props.food.id ?
                            <div className="onElement" style={{display: !edit || selectedItem !== props.food.id ? "flex": "none"}}>
                                <div>
                                    <p>{props.food.name}</p>
                                    <p className="smallP">{props.food.description}</p>
                                    <p style={{
                                        color: food.isActive ? "#FF7B2C" : "black",
                                        fontSize: "16px",
                                        fontWeight: "bold"
                                    }}>€{props.food.price}</p>
                                </div>
                                <FaPen className="editIcon" onClick={(e) => {e.stopPropagation();setEdit(!edit)}} />
                            </div>
                            :
                            <p>{props.food.name}</p>
                            }
                        </div>
    
                        <div className="editItem" style={{display: edit && selectedItem === props.food.id ? "flex" : "none"}}>
                            
                            <form className="generalForm" onSubmit={e=>{submitItemChanges(e)}} >
                                <label htmlFor="itemName">Item Name</label>
                                <input type="text" name="name" id="name" 
                                value={name} onChange={(e) => {e.stopPropagation(); setName(e.target.value)}}
                                onClick={(e) => {e.stopPropagation()}} />

                                <label htmlFor="itemPrice">Item Price</label>
                                <input type="number" name="price" id="price" 
                                value={price} onChange={(e) => {e.stopPropagation(); setPrice(Number(e.target.value))}}
                                onClick={(e) => {e.stopPropagation()}} />

                                <HideAndDeleteButton hideCategory={hideItem} deleteCategory={deleteItem}
                                 hided={!food.isActive} type="item" />
                                
                                <label htmlFor="itemDescription">Item Description</label>
                                <textarea name="description" id="description" 
                                value={description} onChange={e=>{ e.stopPropagation(); setDescription(e.target.value)}}
                                onClick={(e) => {e.stopPropagation()}} rows={4} />

                                <label>Icon</label>
                                    <section className="iconsChoice">
                                        {Array.from(Array(icon_plates).keys()).map((icon) => {
                                            return (
                                                <img key={icon} src={`/plates/food_${icon+1}.svg`} alt="Category cover"
                                                onClick={(e) => {changeItemIcon(e, icon);}} className="foodIcon"
                                                style={{backgroundColor: icon === selectedIcon ? "#530F26" : "white" }} />
                                            )
                                        })
                                        }
                                </section>

                                <aside className="coupleButtons">
                                    <button type="button" onClick={() => setEdit(!edit)}>Cancel</button>
                                    <button type="submit">Save</button>
                                </aside>
                            </form>
                        </div>
                    </div>
                }
            </Draggable>
        </>
    )
}

export default Food;