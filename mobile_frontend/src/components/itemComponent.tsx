// Local imports
// Types
import Item from '../types/item';
import Restaurant from '../types/restaurant';

function ItemComponent(props: {item: Item, restaurant: Restaurant}) {
    const item:Item = props.item;
    const restaurant:Restaurant = props.restaurant;

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <section className='item'>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <aside className='price'>{item.price} €</aside>
                <form className='ordination' style={{display: restaurant.plan >= 2 ? 'visible' : 'none'}} 
                 onSubmit={(e) => onSubmitHandler(e)}>
                    <label htmlFor="quantity">Quanti?</label>
                    <input type="number" name="quantity" min="1" max="10" defaultValue="1" />
                    <button type="submit">Aggiungi al carrello</button>
                </form>
        </section>
    )
}

export default ItemComponent;