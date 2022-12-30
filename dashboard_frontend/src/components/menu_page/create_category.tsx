// Global Imports
import { useState } from "react";

function CreateCategory(){

    const [update, setUpdate] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const createCategory = (e: any) => {
        e.preventDefault();
        console.log("Create Category");
        // Send the request to the backend

        // End of the call
        setUpdate(!update);
    }

    return (
        <div className="createBox">
            <p>Create Category</p>
            <form className="creationForms" onSubmit={(e) => createCategory(e)}>
                <label htmlFor="categoryName">Category Name</label>
                <input type="text" value={categoryName} onChange={(e) => {setCategoryName(e.target.value)}} />

                <label htmlFor="categoryDescription">Category Description</label>
                <input type="text" value={categoryDescription} onChange={(e) => {setCategoryDescription(e.target.value)}} />

                <button type="submit" className="submitBTN">Create</button>
            </form>
        </div>
    )
}

export default CreateCategory;