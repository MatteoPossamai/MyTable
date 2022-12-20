// Global import
import { useContext } from "react";
import { FiEdit2 } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
// Local imports
// Context
import {menuContext} from "./menu";
// Type
import Item from "../types/item";

function ItemDiv(props: {item: Item}){
    const {selectedItem, setSelectedItem} = useContext(menuContext);
    let item = props.item;
    return (
        <div className={item.id === selectedItem ? "item active" : "item"} onClick={() => setSelectedItem(item.id)}>
            <div className="topItem">
                <h3>{item.name}</h3>
                <p className="priceTag">{item.price} €</p>
            </div>

            <div className={item.id === selectedItem ? "it11" : "invisible"}>
                <p>{item.description}</p>
                <FiEdit2 className="iconize" />
                <BiTrash className="iconize" />
            </div>
        </div>
    )
}

export default ItemDiv;