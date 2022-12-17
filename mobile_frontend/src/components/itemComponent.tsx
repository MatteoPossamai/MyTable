// Global imports
import { useState } from 'react';

// Local imports
// Types
import Item from '../types/item';
import Restaurant from '../types/restaurant';

function ItemComponent(props: {item: Item, restaurant: Restaurant, quantity?: number}) {
    // setting up basic variables given by the environment
    let min_order_plan:number = Number(process.env.REACT_APP_MIN_ORDER_PLAN);

    // setting up the state variables
    const [quantity, setQuantity] = useState(props.quantity ? props.quantity : 0);

    const item:Item = props.item;
    const restaurant:Restaurant = props.restaurant;

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, action: string) => {
        event.preventDefault();
        if (action === "plus") {
            setQuantity(quantity + 1);
        } else if (action === "minus") {
            if (quantity > 0) {
                setQuantity(quantity - 1);
            }
        }
    }

    return (
        <section className='item'>
            <img src={`/icon1.png`} alt="Pizza Icon" className='foodIcon' />
            <span className='itemTextSpan'>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <aside className='price'> € {item.price}</aside>
            </span>
            <form className='ordination' style={{display: restaurant.plan >= min_order_plan ? 'visible' : 'none'}} 
                 onSubmit={(e) => onSubmitHandler(e)}>
                <button className='addButton' type='submit' onClick={(e) => handleClick(e, "plus")}>+</button>
                <input type='number' className='quantity' value={quantity} readOnly={true} />
                <button className='removeButton' type='submit' onClick={(e) => handleClick(e, "minus")}>-</button>
            </form>
        </section>
    )
}

export default ItemComponent;