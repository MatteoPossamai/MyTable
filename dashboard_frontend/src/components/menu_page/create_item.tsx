// Global Imports
import { useState } from "react";

function CreateItem(){

    const [update, setUpdate] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemFacts, setItemFacts] = useState("");

    const createItem = (e: any) => {
        e.preventDefault();
        console.log("Create Item");
        // Send the request to the backend

        // End of the call
        setUpdate(!update);
    }

    return (
        <div className="createBox">
            <p>Create Category</p>
            <form className="creationForms" onSubmit={(e) => createItem(e)}>
                <label htmlFor="categoryName">Item Name</label>
                <input type="text" value={itemName} onChange={(e) => {setItemName(e.target.value)}} />

                <label htmlFor="categoryDescription">Item Description</label>
                <input type="text" value={itemDescription} onChange={(e) => {setItemDescription(e.target.value)}} />

                <label htmlFor="categoryDescription">Item Price</label>
                <input type="number" value={itemPrice} onChange={(e) => {setItemPrice(Number(e.target.value))}} />

                <label>Category</label>
                <select name="category" id="category">
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                </select>

                <label htmlFor="categoryDescription">Facts</label>
                <input type="text" value={itemFacts} onChange={(e) => {setItemFacts(e.target.value)}} />

                <button type="submit" className="submitBTN">Create</button>
            </form>
        </div>
    )
}

export default CreateItem;