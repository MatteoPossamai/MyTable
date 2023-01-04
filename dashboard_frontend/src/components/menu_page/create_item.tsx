// Global Imports
import { useState, useContext } from "react";
import Category from "../../types/category";

// Local imports
// Context
import { menuContext } from "../menu";

function CreateItem(){
    // Get from .env file the number of icons
    let icon_plates:number = Number(process.env.REACT_APP_PLATES_ICONS);

    const [update, setUpdate] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [selectedIcon, setSelectedIcon] = useState(0);

    const {categories} = useContext(menuContext);

    const createItem = (e: any) => {
        e.preventDefault();
        console.log("Create Item");
        // Send the request to the backend
        setUpdate(!update);
    }

    const changeCategoryIcon = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, icon:number) => {
        e.stopPropagation();
        setSelectedIcon(icon);
        // Call the API to update the category
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

                <label>Icon</label>
                <section className="iconsChoice">
                    {Array.from(Array(icon_plates).keys()).map((icon) => {
                        return (
                            <img key={icon} src={`/plates/food_${icon+1}.svg`} alt="Category cover"
                            onClick={(e) => {changeCategoryIcon(e, icon);}} className="foodIcon"
                            style={{backgroundColor: icon === selectedIcon ? "#530F26" : "white" }} />
                        )
                    })
                    }
                </section>

                <button type="submit" className="submitBTN">Create</button>
            </form>
        </div>
    )
}

export default CreateItem;