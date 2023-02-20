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
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let token: any = localStorage.getItem("token");
    // Get from .env file the number of icons
    let icon_plates:number = Number(process.env.REACT_APP_PLATES_ICONS);

    const {selectedItem, setSelectedItem, items, setItems, update, setUpdate
        , setDonePopupVisible, setDonePopupText} = useContext(menuContext);
    const {setPopupAwake, setPopupTitle, 
        setPopupMessage, setPopupFollowingFunction} = useContext(menuContext);
    const [edit, setEdit] = useState(false);

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
        });
        setItems(newItems);
    }

    const del = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setPopupAwake(true);
        setPopupTitle("Delete item");
        setPopupMessage("Are you sure you want to delete this item?");
        setPopupFollowingFunction(() => deleteItem);
    }

    const deleteItem = () => {
        let id = props.food.id;
        // Call the API to delete the category
        fetch(`${base_link}/item/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            }}).then(function(response) {
            if(response.status === 403){
                window.location.href = "/login";
            }
            setUpdate(!update);
            setDonePopupText("Deleted successfully");
            setDonePopupVisible(true);
          });
    }

    // Confirm changes
    const submitItemChanges = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let id = props.food.id;
        // Take the number of the item in the items list
        let numb = items.indexOf(props.food);

        let data = {
            "name": name,
            "description": description,
            "price": price,
            "iconId": selectedIcon,
            "isActive": props.food.isActive,
            "number": numb,
            "category": props.food.category,
            "facts": {}
        }
        
        // Call the API to update the item
        fetch(`${base_link}/item/put/${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            },
            body: JSON.stringify(data)
            }).then(function(response) {
            if(response.status === 403){
                window.location.href = "/login";
            }
            setUpdate(!update);
            setEdit(false);
            setDonePopupText("Saved successfully");
            setDonePopupVisible(true);
          });
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
                                <FaPen className="editIcon" onClick={(e) => {e.stopPropagation();setEdit(!edit);setSelectedIcon(props.food.iconId)}} />
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

                                <HideAndDeleteButton hideCategory={hideItem} deleteCategory={del}
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