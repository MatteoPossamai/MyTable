// Global imports
import { useContext, useState } from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {DragDropContext,Droppable, DropResult} from "@hello-pangea/dnd";

// Local imports
// Context
import { menuContext } from "../menu";
// Components
import CategoryItem from "./cateogory";
// Types
import Category from "../../types/category";

function Categories(){
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let token: any = localStorage.getItem("token");

    const [search, setSearch] = useState("");
    const {categories, setCategories, update, setUpdate} = useContext(menuContext);

    // Handle modification
    const handleModification = (e: any) => {
        setSearch(e.target.value);
    }

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
                "categories": categories
            }

            fetch(`${base_link}/category/bulk_update/`, {
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

    let filteredCategories = categories.filter((category:Category) => {
        return category.name.toLowerCase().includes(search.toLowerCase());
    });

    const onDragEnd = (result:DropResult) => {
        const {destination, source} = result;
        if (!destination) return;

        const items:Category[] = Array.from(categories);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);

        for(let i = 0; i < items.length; i++){
            items[i].number = i+1;
        }

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

                        {/* Empty category list placeholder */}
                        {filteredCategories.length === 0 &&
                            <div className="category">
                                <p style={{margin: "15px auto"}}>
                                    {"No categories found with these specs"}
                                </p>
                            </div>
                        }
                            {provided.placeholder}
                    </div>}
                </Droppable>
            </DragDropContext>
            <button onClick={(e) => confirmChanges(e)} className="submitBTN bottomButton"
            style={{display: categories.length > 0 ? "block" : "none" }}>Confirm changes</button>
        </div>
    )
}

export default Categories;