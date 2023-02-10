// Global imports
import React, { useContext, useState } from "react";
import {MdOutlineDragIndicator} from "react-icons/md";
import { Draggable } from "@hello-pangea/dnd";

// Local imports
// Context
import { menuContext } from "../menu";
// Components
import HideAndDeleteButton from "./hideAndDeleteButton";
// Types
import Category from "../../types/category";

function CategoryItem(props:{category:Category, idx:number}) {
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let token: any = localStorage.getItem("token");
    const {categories, setCategories, update, setUpdate} = useContext(menuContext);
    const {selectedCategory, setSelectedCategory} = useContext(menuContext);

    const [name, setName] = useState(props.category.name);
    const [description, setDescription] = useState(props.category.description);

    let category = categories.find((category:Category) => category.id === props.category.id);

    // Handle category click
    const handleCategoryClick = () => {
        if (selectedCategory === category.id) {
            setSelectedCategory(-1);
            return;
        }
        setSelectedCategory(category.id);
    }

    // Hide/show category
    const hideCategory = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setCategories(categories.map((category:Category) => {
            if (category.id === props.category.id) {
                category.isActive = !category.isActive;
            }
            return category;
        }));
        // Call the API to update the category
        setUpdate(!update);
    }

    // Delete category
    const deleteCategory = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        let id = props.category.id;
        console.log(token)
        // Call the API to delete the category
        fetch(`${base_link}/category/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            }}).then(function(response) {
            if(response.status === 403){
                window.location.href = "/login";
            }
          });
        setUpdate(!update);
    }

    // Change name
    const changeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setName(e.target.value);
    }

    // Change description
    const changeDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
        setDescription(e.target.value);
    }

    // Update category
    const updateCategory = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // Check if the name is given
        if (name === "") {
            alert("The name must be given");
            return;
        }
        // Check if the description is given
        if (description === "") {
            alert("The description must be given");
            return;
        }
        // Call the API to update the category

        // Data are in name, description
        setUpdate(!update);  
    } 
    
    const resetContent = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        setName(props.category.name);
        setDescription(props.category.description);
    }


    return (
        <>      
            <Draggable key={props.category.id} draggableId={props.category.id.toString()} index={props.idx}>
                {(provided) => (
                    <div className={selectedCategory === category.id ? "category activeCategory":"category"}
                    id={category.isActive ? "":"hidden"}
                    onClick={() => handleCategoryClick()} 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                            
                        <div className="alwaysActiveCategory" style={{alignItems: props.category.id === selectedCategory ? "center" : "normal"}}>
                            <MdOutlineDragIndicator className="dragIcon" />
                            <p style={{display: props.category.id === selectedCategory ? "none" : "block" }}>{category.name}</p>
                        </div>
            
                        <aside style={{display: selectedCategory === category.id ? "flex": "none"}}>
            
                            <form className="generalForm" onClick={(e) => e.stopPropagation()} onSubmit={e => updateCategory(e)}>
                                <label htmlFor="categoryName">Category Name</label>
                                <input value={name} onChange={(e) => changeName(e)} type="text" name="categoryName" id="categoryName" /> 
                                <label htmlFor="categoryDescription">Category Description</label>   
                                <textarea value={description} onChange={(e) => changeDescription(e)} name="categoryDescription" id="categoryDescription" 
                                        style={{maxWidth: "85%"}} rows={4} />
                                <aside className="coupleButtons">
                                    <button type="reset" onClick={e=>resetContent(e)}>Reset changes</button>
                                    <button type="submit">Update Category</button>
                                </aside>

                                <HideAndDeleteButton hideCategory={hideCategory} deleteCategory={deleteCategory} 
                                hided={!category.isActive} type="category" />

                            </form> 
                        </aside>
                    </div>
                )}
            </Draggable>
        </>
    )
}

export default CategoryItem;