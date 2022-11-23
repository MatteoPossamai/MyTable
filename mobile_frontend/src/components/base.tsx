// Global imports
import {MdOutlineShoppingCart} from 'react-icons/md';

// Local imports
// Components
import ItemComponent from './itemComponent';
import Footer from './footer';
// Types
import Item from '../types/item';
// Other
import data from '../faker.json';

function Base(){
    return (
        <div className="flex-wrapper">
            {/* Header */}
            <h1>Restaurant Name</h1>
            <input type="text" placeholder="Search" />

            {/* Cart Icon */}
            <MdOutlineShoppingCart />

            {/* NavBar for categories */}
            <nav className="categories">
                <button className="category">All</button>
                <button className="category">Pizza</button>
                <button className="category">Burgers</button>
                <button className="category">Salads</button>
                <button className="category">Desserts</button>
            </nav>

            {/* All Products to display */}
            { data['products'].map((item:Item) => {
                return (
                    <ItemComponent item={item} />
                )
            })}

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Base;