//Local imports
// Types
import Item from "../types/item";

function ActiveItem(props:{item:Item}){
    return (
        <div className="activeItem">
            <h3>{props.item.name}</h3>
            <p>{props.item.description}</p>
            <p className="priceTag">{props.item.price} €</p>
        </div>
    )
}

export default ActiveItem;