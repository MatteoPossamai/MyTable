// Global imports
import { useState, useContext } from "react";

//Local imports
// Context
import {itemContext} from "./foods";
// Types
import Item from "../types/item";
import Category from "../types/category";

function ActiveItem(props:{item:Item}){
    const [modifier, setModifier] = useState<boolean>(false);

    const {cat, items, update, setUpdate} = useContext(itemContext);

    // Food creation states
    const [foodName, setFoodName] = useState<string>("");
    const [foodDescription, setFoodDescription] = useState<string>("");
    const [foodPrice, setFoodPrice] = useState<string>("0");
    const [foodCategory, setFoodCategory] = useState<number>(0);
    const [foodImage, setFoodImage] = useState<string>("");

    const modifyFood = (e: any) => {
        let item:Item = items.filter((item:Item) => item.id === props.item.id)[0];
        let idx = items.indexOf(item);
        e.preventDefault();
        item = {
            id: item.id,
            name: foodName,
            description: foodDescription,
            price: Number(foodPrice),
            category: foodCategory,
        };
        items[idx] = item;
        // Call the api to create the food
        setUpdate(!update);
    }

    return (
        <div className="activeItem">
            <h3>{props.item.name}</h3>
            <p>{props.item.description}</p>
            <p>{props.item.price} €</p>
            <button onClick={() => setModifier(!modifier)}>Modifica</button>
            <aside className="modifier" style={{display: modifier ? "block" : "none"}}>
                <form className="addFoodForm" onSubmit={(e) => {modifyFood(e)}}>
                        <input type="text" value={foodName} onChange={(e) =>{setFoodName(e.target.value)}} placeholder="Food name" />
                        <input type="text" value={foodDescription} onChange={(e) =>{setFoodDescription(e.target.value)}} placeholder="Food description" />
                        <input type="text" value={foodPrice} onChange={(e) =>{setFoodPrice(e.target.value)}} placeholder="Food price" />
                        
                        <select name="category" onChange={(e) => {setFoodCategory(Number(e.target.value))}}>
                            {
                                cat.map((category:Category) => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })
                            }
                        </select>
                        <input type="text" value={foodImage} onChange={(e) =>{setFoodImage(e.target.value)}} placeholder="Food image" />
                        <button type="submit" onClick={(e) =>{modifyFood(e)}}>Add Food</button>
                    </form>
            </aside>
        </div>
    )
}

export default ActiveItem;