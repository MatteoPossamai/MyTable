// Global Imports
import { useState, useContext } from "react";
import Category from "../../types/category";

// Local imports
// Context
import { menuContext } from "../menu";

function CreateItem(){

    const [update, setUpdate] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState(0);

    const {categories} = useContext(menuContext);

    const createItem = (e: any) => {
        e.preventDefault();
        console.log("Create Item");
        // Send the request to the backend
        setUpdate(!update);
    }

    return (
        <div className="createBox">
            <p>Create Item</p>
            <form className="creationForms" onSubmit={(e) => createItem(e)}>
                <label htmlFor="categoryName">Item Name</label>
                <input className="creationInput" type="text" value={itemName} onChange={(e) => {setItemName(e.target.value)}} />

                <label htmlFor="categoryDescription">Item Description</label>
                <input className="creationInput" type="text" value={itemDescription} onChange={(e) => {setItemDescription(e.target.value)}} />

                <label htmlFor="categoryDescription">Item Price</label>
                <input className="creationInput" type="number" value={itemPrice} onChange={(e) => {setItemPrice(Number(e.target.value))}} />

                <label>Category</label>
                <select name="category" className="selectionCategory">
                    {categories.map((category: Category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>

                <button type="submit" className="submitBTN">Create</button>
            </form>
        </div>
    )
}

export default CreateItem;