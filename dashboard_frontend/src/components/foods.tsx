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

    // fetching data from the fake server
    let items = data.products;
    let cat = categories.categories;

    console.log(items.filter((item) => item.id === selectedItem)[0])

    const getActive = () => {
        if (selectedItem === 0){
            return {id:1, name: "Select a food", description: "Select a food to see the details", price: 0, category: 0}
        } else {
            return items.filter((item) => item.id === selectedItem)[0]
        }
    }

    return (
        <itemContext.Provider value={{selectedItem, setSelectedItem}}>
        <div style={{display: "flex", flexDirection: "row"}}>
            <section className="foodList">
                <div>
                <h1>All your Foods</h1>
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
                    <h1>Food Details</h1>
                    <div className="foodDetailsContainer">
                        <ActiveItem item={getActive()} />
                    </div>
                </div>
            </section>
            <hr />

            <div className="add-food">
                <h1>Add Food</h1>  
                <form className="addFoodForm">
                    <input type="text" placeholder="Food name" />
                    <input type="text" placeholder="Food description" />
                    <input type="text" placeholder="Food price" />
                    <select name="category">
                        {
                            cat.map((category) => {
                                return <option  key={category.id} value={category.id}>{category.name}</option>
                            })
                        }
                    </select>
                    <input type="text" placeholder="Food image" />
                    <button type="submit">Add Food</button>
                </form>
            </div>
        </div>
        </itemContext.Provider>
    )
}

export default Foods;
export {itemContext};