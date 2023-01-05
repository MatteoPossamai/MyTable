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

    // Error handling
    const activateError = () => {
        let flag = true;
        if(itemName === ""){
            let problem = document.getElementById("categoryProblem5");
            problem!.style.display = "block";
            flag = false;
        }
        if(itemDescription === ""){
            let problem = document.getElementById("categoryProblem6");
            problem!.style.display = "block";
            flag = false;
        }
        if(itemPrice <= 0){
            let problem = document.getElementById("categoryProblem7");
            problem!.style.display = "block";
            flag = false;
        }
        return flag;
    }

    const deactivateError = () => {
        let problem = document.getElementById("categoryProblem5");
        problem!.style.display = "none";

        let problem2 = document.getElementById("categoryProblem6");
        problem2!.style.display = "none";

        let problem3 = document.getElementById("categoryProblem7");
        problem3!.style.display = "none";
    }

    const createItem = (e: any) => {
        e.preventDefault();
        let flag = activateError();

        if(flag){
            // Call the API to create the item
            setItemName("");
            setItemDescription("");
            setItemPrice(0);
            setSelectedIcon(0);
        }
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
            <form className="generalForm" onSubmit={(e) => createItem(e)}>
                <label htmlFor="categoryName">Item Name</label>
                <p id="categoryProblem5">The name must be given</p>
                <input  type="text" value={itemName} onChange={(e) => {setItemName(e.target.value);deactivateError()}} />

                <label htmlFor="categoryDescription">Item Description</label>
                <p id="categoryProblem6">The description must be given</p>
                <input type="text" value={itemDescription} onChange={(e) => {setItemDescription(e.target.value)
                deactivateError()}} />

                <label htmlFor="categoryDescription">Item Price</label>
                <p id="categoryProblem7">The price must be bigger than 0 euro</p>
                <input type="number" value={itemPrice} onChange={(e) => {setItemPrice(Number(e.target.value))
                deactivateError()}} />

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

                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateItem;