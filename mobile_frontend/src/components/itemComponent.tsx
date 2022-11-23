// Local imports
// Types
import Item from '../types/item';

function ItemComponent(props: {item: Item}){
    const item:Item = props.item;
    return (
        <section className='item'>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
        </section>
    )
}

export default ItemComponent;