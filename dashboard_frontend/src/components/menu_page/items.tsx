// Global imports
import {AiOutlineSearch} from "react-icons/ai";
import { useState, useContext } from "react";
import {DragDropContext,Droppable, DropResult} from "@hello-pangea/dnd";

// Local imports
// Context
import { menuContext } from "../menu";
// Components
import ItemComponent from "./item";
// Types
import Item from "../../types/item";

function Items(){
    const {items, setItems, selectedCategory} = useContext(menuContext);
    const [search, setSearch] = useState("");

    const handleModification = (e: any) => {
        setSearch(e.target.value);
    }

    let filteredItems = items.filter((item:Item)=>{
        return item.category === selectedCategory;
    }).filter((item: Item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });

    // On drag end
    const onDragEnd = (result:DropResult) => {
        const {destination, source} = result;
        if (!destination) return;

        let categoryItems:Item[] = items.filter((item:Item)=>{
            return item.category === selectedCategory;
        });
        let nonCategoryItems:Item[] = items.filter((item:Item)=>{
            return item.category !== selectedCategory;
        });

        // Swap elements in the category, according to destination and source
        const [newOrder] = categoryItems.splice(source.index, 1);
        categoryItems.splice(destination.index, 0, newOrder);

        let all_items:Item[] = categoryItems.concat(nonCategoryItems);

        // Set the item numbers
        for(let i = 0; i < all_items.length; i++){
            all_items[i].number = i+1;
        }

        setItems(all_items);
    }

    return (
        <div className="greyBox">
            <header className="header_menu">
                <p>Category foods</p>
                <div className="searchContainer">
                    <AiOutlineSearch className="searchIcon" />
                    <input type={"text"} placeholder={"Search"} className="searchBar" value={search} 
                        onChange={(e) => handleModification(e)} />
                </div>
            </header>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={"items"}>
                    {(provided: any) => 
                        <div {...provided.droppableProps} 
                        ref={provided.innerRef}
                        className="categoriesContainer">

                            {/* All the categories */}
                            {filteredItems.map((item: Item, idx:number) => {
                                return (
                                    <ItemComponent food={item} key={item.id} idx={idx} />
                                )
                            })}
        
                            {/* Add item button */}
                            <div className="category" style={{display: selectedCategory === -1 ? "none" : "flex"}}
                            onClick={()=>{console.log("Create Item in the category")}}>
                                <p style={{margin: "15px auto"}}>Add Item in this category</p>
                            </div>
        
                            {/* Empty category placeholder */}
                            <div className="category" style={{display: selectedCategory === -1 ? "flex" : "none"}}>
                                <p style={{margin: "15px auto"}}>Select a category to see the items</p>
                            </div>
                        
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Items;