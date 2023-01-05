// Global Imports
import { useState } from "react";

function CreateCategory(){

    const [update, setUpdate] = useState(false);
    
    // Data to be sent to the API on creation of the category
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const activeError = () => {
        let flag = true;
        if(categoryName === ""){
            let name = document.getElementById("categoryName");
            let problem = document.getElementById("categoryProblem1");
            name!.style.border = "1px solid red";
            problem!.style.display = "block";
            flag = false;
        }
        if(categoryDescription === ""){
            let desc = document.getElementById("categoryDescription");
            let problem = document.getElementById("categoryProblem2");
            desc!.style.border = "1px solid red";
            problem!.style.display = "block";
            flag = false;
        }
        return flag;
    }

    const deactiveError = () => {
        let name = document.getElementById("categoryName");
        let problem = document.getElementById("categoryProblem1");
        name!.style.border = "none";
        problem!.style.display = "none";

        let desc = document.getElementById("categoryDescription");
        let problem2 = document.getElementById("categoryProblem2");
        desc!.style.border = "none";
        problem2!.style.display = "none";
    }

    const createCategory = (e: any) => {
        e.preventDefault();
        let flag = activeError();
     
        if(flag){
            setCategoryName("");
            setCategoryDescription("");
            // Call the API to create the category
            // TODO: Call the API to create the category
            // Update the menu
            setUpdate(!update);
        }
    }

    return (
        <div className="createBox">
            <p>Create Category</p>
            <form className="creationForms" onSubmit={(e) => createCategory(e)}>
                <label htmlFor="categoryName">Category Name</label>
                <p id="categoryProblem1">The name must be given</p>
                <input className="creationInput" type="text" value={categoryName} id="categoryName"
                onChange={(e) => {setCategoryName(e.target.value);deactiveError()}} />

                <label htmlFor="categoryDescription">Category Description</label>
                <p id="categoryProblem2">The description must be given</p>
                <input className="creationInput" type="text" value={categoryDescription} id="categoryDescription"
                 onChange={(e) => {setCategoryDescription(e.target.value);deactiveError()}} />

                <button type="submit" className="submitBTN">Create</button>
            </form>
        </div>
    )
}

export default CreateCategory;