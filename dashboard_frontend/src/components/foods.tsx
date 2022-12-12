// Global Imports
import { useState, createContext } from "react";

// Local imports
// Components
import ItemDivMain from "./itemdivmain";
import ActiveItem from "./activeItem";
// Types
import Item from "../types/item";

import data from "../faker.json";
import categories from "../fake_categories.json";

let itemContext = createContext<any>(0);

function Foods(){
    // state
    const [selectedItem, setSelectedItem] = useState<number>(0);

    // Food creation states
    const [foodName, setFoodName] = useState<string>("");
    const [foodDescription, setFoodDescription] = useState<string>("");
    const [foodPrice, setFoodPrice] = useState<string>("0");
    const [foodCategory, setFoodCategory] = useState<number>(0);
    const [foodImage, setFoodImage] = useState<string>("");

    const [update, setUpdate] = useState<boolean>(false);


    // fetching data from the fake server
    let items = data.products;
    let cat = categories.categories;

    const getActive = () => {
        if (selectedItem === 0){
            return {id:1, name: "Select a food", description: "Select a food to see the details", price: 0, category: 0}
        } else {
            return items.filter((item) => item.id === selectedItem)[0]
        }
    }

    const createFood = (e: any) => {
        e.preventDefault();
        let newFood = {
            id: items.length + 1,
            name: foodName,
            description: foodDescription,
            price: Number(foodPrice),
            category: foodCategory,
            image: foodImage
        }
        items.push(newFood);
        // Call the api to create the food
        setUpdate(!update);
    }

    return (
        <itemContext.Provider value={{selectedItem, setSelectedItem, items, cat, update, setUpdate}}>
        <div style={{display: "flex", flexDirection: "row"}}>
            <section className="foodList">
                <div>
                <h1>Tutti i tuoi prodotti</h1>
                    <div className="foodContainer">
                        {
                            items.map((item: Item) =>{
                                return <ItemDivMain key={item.id} item={item} />
                            })
                        }
                    </div>
                </div>
            </section>

            <section className="foodDetails">
                <div>
                    <h1>Dettagli del prodotto</h1>
                    <div className="foodDetailsContainer">
                        <ActiveItem item={getActive()} />
                    </div>
                </div>
            </section>
            <hr />

            <div className="add-food">
                <h1>Aggiungi prodotto</h1>  
                <form className="addFoodForm" onSubmit={(e) => {createFood(e)}}>
                    <input type="text" value={foodName} onChange={(e) =>{setFoodName(e.target.value)}} placeholder="Food name" />
                    <input type="text" value={foodDescription} onChange={(e) =>{setFoodDescription(e.target.value)}} placeholder="Food description" />
                    <input type="text" value={foodPrice} onChange={(e) =>{setFoodPrice(e.target.value)}} placeholder="Food price" />
                    
                    <select name="category" onChange={(e) => {setFoodCategory(Number(e.target.value))}}>
                        {
                            cat.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })
                        }
                    </select>
                    <input type="text" value={foodImage} onChange={(e) =>{setFoodImage(e.target.value)}} placeholder="Food image" />
                    <button type="submit">Add Food</button>
                </form>
            </div>
        </div>
        </itemContext.Provider>
    )
}

export default Foods;
export {itemContext};