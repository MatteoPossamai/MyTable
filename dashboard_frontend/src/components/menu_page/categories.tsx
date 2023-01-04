// Global imports
import { useContext, useState } from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {DragDropContext,Droppable, DropResult} from "react-beautiful-dnd";

// Local imports
// Context
import { menuContext } from "../menu";
// Components
import CategoryItem from "./cateogory";
// Types
import Category from "../../types/category";

function Categories(){
    const [search, setSearch] = useState("");
    const {categories, setCategories} = useContext(menuContext);

    // Handle modification
    const handleModification = (e: any) => {
        setSearch(e.target.value);
    }

    // Confirm changes
    const confirmChanges = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // Call the API to update the categories
        let data = {
            categories: categories
        }

        console.log(data)
    }

    let filteredCategories = categories.filter((category:Category) => {
        return category.name.toLowerCase().includes(search.toLowerCase());
    });

    const onDragEnd = (result:DropResult) => {
        const {destination, source} = result;
        if (!destination) return;

        const items = Array.from(categories);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);

        setCategories(items);
    }

    return (
        <div className="greyBox">
            <header className="header_menu">
                <p>All your categories</p>
                <div className="searchContainer">
                    <AiOutlineSearch className="searchIcon" />
                    <input type={"text"} placeholder={"Search"} className="searchBar" value={search} 
                        onChange={(e) => handleModification(e)} />
                </div>
            </header>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="categories">
                    {(provided) =>
                        <div {...provided.droppableProps} 
                            ref={provided.innerRef}
                            className="categoriesContainer" >

                        {filteredCategories.map((category: Category, idx: number) => {
                            return (
                                <CategoryItem  key={category.id} idx={idx} category={category}/>
                                )
                            })}

                    </div>}
                </Droppable>
            </DragDropContext>
            <button onClick={(e) => confirmChanges(e)} className="submitBTN bottomButton">Confirm changes</button>
        </div>
    )
}

export default Categories;