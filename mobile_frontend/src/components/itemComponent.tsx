// Global imports
import { useContext, memo, useCallback } from 'react';

// Local imports
// Context
import { orderedContext } from "./base";
// Types
import Item from '../types/item';
import Restaurant from '../types/restaurant';

const ItemComponent = memo((props: {item: Item, restaurant: Restaurant, active?:boolean, auth: any}) => {

    const {orderedItems, setOrderedItems, quantities, setQuantities} = useContext(orderedContext);

    // setting up the state variables
    let quantity = quantities[orderedItems.indexOf(props.item)] || 0;

    const item:Item = props.item;

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, action: string) => {
        event.preventDefault();
        if (action === "plus") {
            if (quantity === 0){
                setOrderedItems([...orderedItems, item]);
                setQuantities([...quantities, 1]);
            } else {
                let newQuantities:number[] = [...quantities];
                newQuantities[orderedItems.indexOf(item)] += 1;
                setQuantities(newQuantities);
            }          
        } else if (action === "minus") {
            if (quantity === 1){
                let newOrderedItems:Item[] = [...orderedItems];
                let newQuantities:number[] = [...quantities];
                newOrderedItems.splice(orderedItems.indexOf(item), 1);
                newQuantities.splice(orderedItems.indexOf(item), 1);
                setOrderedItems(newOrderedItems);
                setQuantities(newQuantities);
            }else{
                let newQuantities:number[] = [...quantities];
                newQuantities[orderedItems.indexOf(item)] -= 1;
                setQuantities(newQuantities);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderedItems, quantities, item]);

    return (
        <section className='item'>

            {/* Put the svg and change its color to white */}
            <img src={`/new_plates/food_${item.iconId + 1}.png`} alt="Food Icon" className='foodIcon'
            hidden={item.iconId !== 0 ? false : true} width={120} height={120} />
            <span className='itemTextSpan'>
                <h3>{item.name}</h3>
                <p className='itemDescription'>{item.description}</p>
                <aside className='price' style={{opacity: item.price > 0 ? "100" : "0"}}> € {item.price}</aside>
            </span>
            <form className='ordination' style={{display: props.auth.client_order ? 'visible' : 'none'}} 
                 onSubmit={(e) => onSubmitHandler(e)}>
                <button className='addButton' type='submit' onClick={(e) => handleClick(e, "plus")}>+</button>
                <input type='number' className='quantity' value={quantity} readOnly={true} />
                <button className='removeButton' type='submit' onClick={(e) => handleClick(e, "minus")}>-</button>
            </form>
        </section>
    )
});

export default ItemComponent;