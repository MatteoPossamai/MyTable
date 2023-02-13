// Global imports
import {memo, useContext} from 'react';

// Local imports
// Context
import { orderedContext } from "./base";
// Types
import Category from '../types/category';

const Navbar = memo((props: {categories:any, activeCategory: number, handleClick: any, note: boolean}) => {
    let categories = props.categories;
    let activeCategory = props.activeCategory;
    let handleClick = props.handleClick;

    const {setVisible} = useContext(orderedContext);

    function addNote(e: any){
        e.stopPropagation();
        if (props.note){
            // open the note popup
            setVisible(true);
        }
    }

    return (
        <nav className='parent'>
            <nav className="categories">
                { categories?.map((category:Category) => 
                    <button key={category.id} className="smallButton" id={category.id === activeCategory ? "activeSmallButton" : ""}
                    onClick={() => handleClick(category)}>{category.name}</button>
                ) }
            </nav>
            <aside className={props.note ? "note" : "emptyButton"} onClick={(e) => addNote(e)}>
                <img src={"/other/note.svg"} style={{display: props.note ? "block" : "none"}} alt="note"/>
            </aside>
        </nav>
    )
});

export default Navbar;