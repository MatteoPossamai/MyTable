// Global imports
import {memo} from 'react';

// Local imports
// Types
import Category from '../types/category';

const Navbar = memo((props: {categories:any, activeCategory: number, handleClick: any}) => {
    let categories = props.categories;
    let activeCategory = props.activeCategory;
    let handleClick = props.handleClick;

    return (
        <nav className="categories">
            { categories?.map((category:Category) => 
                <button key={category.id} className="smallButton" id={category.id === activeCategory ? "activeSmallButton" : ""}
                onClick={() => handleClick(category)}>{category.name}</button>
            ) }
        </nav>
    )
});

export default Navbar;