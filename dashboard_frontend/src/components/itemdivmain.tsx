// Global import
import { useContext } from "react";
// Local imports
// Context
import {itemContext} from "./foods";
// Type
import Item from "../types/item";

function ItemDivMain(props: {item: Item}){
    const {selectedItem, setSelectedItem} = useContext(itemContext);

    let item = props.item;
    return (
        <div className={item.id === selectedItem ? "item active" : "item"} onClick={() => setSelectedItem(item.id)}>
            <div className="topItem">
                <h3>{item.name}</h3>
                <p className="priceTag">{item.price} €</p>
            </div>
        </div>
    )
}

export default ItemDivMain;