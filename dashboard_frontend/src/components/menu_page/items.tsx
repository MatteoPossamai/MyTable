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
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let token: any = localStorage.getItem("token");
    const {items, setItems, selectedCategory, update, setUpdate} = useContext(menuContext);
    const [search, setSearch] = useState("");

    const handleModification = (e: any) => {
        setSearch(e.target.value);
    }

    let filteredItems = items.filter((item:Item)=>{
        return item.category === selectedCategory;
    }).filter((item: Item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });

    // Confirm changes
    const confirmChanges = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // Call the API to update the categories
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[4];

        if (id === undefined || isNaN(parseInt(id))) {
            window.location.href = "/login";
        }

        let data = {
            "items": items
        }

        fetch(`${base_link}/item/bulk_update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            },
            body: JSON.stringify(data)
            }).then(function(response) {
            if(response.status === 403){
                window.location.href = "/login";
            }
            // Update the menu
            setUpdate(!update);
            });
    }

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
        
                            {/* Empty category placeholder */}
                            <div className="category" style={{display: selectedCategory === -1 || filteredItems.length === 0 ? "flex" : "none"}}>
                                <p style={{margin: "15px auto"}}>
                                    {selectedCategory === -1 ? "Select a category to see its items" : "No items in this category"}
                                </p>
                            </div>
                        
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>
            </DragDropContext>
            <button onClick={(e) => confirmChanges(e)} className="submitBTN bottomButton"
            style={{display: filteredItems.length > 0 ? "block" : "none" }}>Confirm changes</button>
        </div>
    )
}

export default Items;