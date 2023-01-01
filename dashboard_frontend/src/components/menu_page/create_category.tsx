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

                <label>Icon</label>
                <select name="icon">
                    <option value="1">Icon 1</option>
                    <option value="2">Icon 2</option>
                    <option value="3">Icon 3</option>
                </select>

                <button type="submit" className="submitBTN">Create</button>
            </form>
        </div>
    )
}

export default CreateCategory;