// Global imports
import React, { useContext, useState } from "react";
import {MdOutlineDragIndicator} from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { Draggable } from "@hello-pangea/dnd";

// Local imports
// Context
import { menuContext } from "../menu";
// Types
import Category from "../../types/category";

function CategoryItem(props:{category:Category, idx:number}) {
    const {categories, setCategories} = useContext(menuContext);
    const {selectedCategory, setSelectedCategory} = useContext(menuContext);
    const [update, setUpdate] = useState(true);

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
        // Call the API to delete the category
        setUpdate(!update);
    }

    // Change name
    const changeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        deactiveError();
        setName(e.target.value);
    }

    // Change description
    const changeDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
        deactiveError();
        setDescription(e.target.value);
    }

    const activeError = () => {
        let flag = true;
        if(name === ""){
            let name = document.getElementById("categoryName");
            let problem = document.getElementById("categoryProblem3");
            name!.style.border = "1px solid red";
            problem!.style.display = "block";
            flag = false;
        }
        if(description === ""){
            let desc = document.getElementById("categoryDescription");
            let problem = document.getElementById("categoryProblem4");
            desc!.style.border = "1px solid red";
            problem!.style.display = "block";
            flag = false;
        }
        return flag;
    }

    const deactiveError = () => {
        let name = document.getElementById("categoryName");
        let problem = document.getElementById("categoryProblem3");
        name!.style.border = "none";
        problem!.style.display = "none";

        let desc = document.getElementById("categoryDescription");
        let problem2 = document.getElementById("categoryProblem4");
        desc!.style.border = "none";
        problem2!.style.display = "none";
    }

    // Update category
    const updateCategory = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let flag = activeError();

        if(flag){
            e.preventDefault();
            e.stopPropagation();
            // Call the API to update the category

            // Data are in name, description
            setUpdate(!update);
        }      
    }      

    return (
        <>      
            <Draggable key={props.category.id} draggableId={props.category.id.toString()} index={props.idx}>
                {(provided, snapshot) => (
                    <div className={selectedCategory === category.id ? "category activeCategory":"category"}
                    onClick={() => handleCategoryClick()} 
                    style={{backgroundColor: category.isActive ? "" : "#FF7B7B"}}
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                            
                        <div className="alwaysActiveCategory" style={{alignItems: props.category.id === selectedCategory ? "center" : "normal"}}>
                            <MdOutlineDragIndicator className="dragIcon" />
                            <p style={{display: props.category.id === selectedCategory ? "none" : "block" }}>{category.name}</p>
                        </div>
            
                        <aside style={{display: selectedCategory === category.id ? "flex": "none"}}>
            
                            <form className="modifyCategory" onClick={(e) => e.stopPropagation()} onSubmit={e => updateCategory(e)}>
                                <label htmlFor="categoryName">Category Name</label>
                                <p id="categoryProblem3">The name must be given</p>
                                <input value={name} onChange={(e) => changeName(e)} type="text" name="categoryName" id="categoryName" />    
                                <label htmlFor="categoryDescription">Category Description</label>
                                <p id="categoryProblem4">The description must be given</p>
                                <textarea value={description} onChange={(e) => changeDescription(e)} name="categoryDescription" id="categoryDescription" 
                                        style={{maxWidth: "85%"}} />
                                <button>Update Category</button>
                                <div className="manageCategory">
                                    <button onClick={(e) => hideCategory(e) }> <BiHide className="hideIcon" 
                                            style={{backgroundColor: categories.find((category: Category) => category.id === props.category.id).isActive ? "#FF7B7B" : "#76CB8E"}} /> 
                                        {category.isActive ? "Hide Category" : "Show Category"}
                                    </button>
                                    <button onClick={(e) => deleteCategory(e)}> <BsTrash className="deleteIcon" /> Delete Category</button>
                                </div>
                            </form> 
                        </aside>
                    </div>
                )}
            </Draggable>
        </>
    )
}

export default CategoryItem;