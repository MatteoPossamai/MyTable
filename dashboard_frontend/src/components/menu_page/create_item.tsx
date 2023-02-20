// Global Imports
import { useState, useContext } from "react";
import Category from "../../types/category";

// Local imports
// Context
import { menuContext } from "../menu";

function CreateItem(){
    // Get from .env file the number of icons
    let icon_plates:number = Number(process.env.REACT_APP_PLATES_ICONS);
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let token: any = localStorage.getItem("token");

    const {categories, update, setUpdate, setDonePopupVisible, setDonePopupText} = useContext(menuContext);

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [selectedIcon, setSelectedIcon] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(-1);

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
            let currentUrl = window.location.href;
            let id = currentUrl.split("/")[4];

            if (id === undefined || isNaN(parseInt(id))) {
                window.location.href = "/login";
            }

            let data = {
                "category": selectedCategory,
                "name": itemName,
                "description": itemDescription,
                "price": itemPrice,
                "iconId": selectedIcon,
                "isActive": true,
                "number": 1,
                "facts": {}
            }

            if(selectedCategory===-1){
                data["category"] = categories[0].id;
                setSelectedCategory(categories[0].id);
            }

            fetch(`${base_link}/item/create/`, {
                method: "POST",
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
                console.log(response);
                // Update the menu
                setUpdate(!update);
                setItemPrice(0);
                setItemName("");
                setItemDescription("");
                setDonePopupVisible(true);
                setDonePopupText("Item created successfully");
                return response.json();
              });
        }
        
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
                <input type="number" required min="0" step=".01" value={itemPrice} onChange={(e) => {setItemPrice(Number(e.target.value))
                deactivateError()}} />

                <label>Category</label>
                <select name="category" className="selectionCategory" value={selectedCategory}
                    onChange={(e) => {setSelectedCategory(Number(e.target.value));console.log(selectedCategory)}}>
                    {categories.map((category: Category) => {
                        return (
                            <option key={category.id} value={Number(category.id)}>{category.name}</option>
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