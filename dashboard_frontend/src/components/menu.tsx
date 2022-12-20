// Global Imports
import { useState, createContext } from "react";

// Local imports
import data from "../fake_categories.json";
import faker from "../faker.json";
// Components
import SingleCategory from "./category";
import ItemDiv from "./item";
// Types
import Item from "../types/item";
import Category from "../types/category";

let menuContext = createContext<any>(0);

function Menu(){
    // fetching data from the fake server
    const categories = data.categories;
    categories.sort((a, b) => a.number-b.number);

    // state for the selected category
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? categories[0].id : null);
    const [selectedItem, setSelectedItem] = useState<number>(-1);

    let items = faker.products;
    items = items.filter(item => item.category === selectedCategory);

    return (
        <menuContext.Provider value={{selectedCategory, setSelectedCategory, selectedItem, setSelectedItem}}>
            <section className="categories">
                <div className="categories-content">
                    <h1>All your Categories</h1>
                    <div className="all-categories">
                        <div className="categories-list">
                            {categories.map((category: Category) => (
                                <SingleCategory key={category.id} category={category} />
                            ))}
                        </div>
                    </div>
                </div>

                <hr />

                <div className="categories-foods">
                    <h1>Category's foods</h1>
                    <div className="all-categories">
                        {
                            items.map((item: Item) =>{
                                return <ItemDiv key={item.id} item={item} />
                            })
                        }
                    </div>
                </div>
                        

                <hr />

                <div className="add-category">
                    <h1>Add Category</h1>
                    <form className="addCategoryForm">
                        <label htmlFor="category-name" className="labelForm">Category Name</label>
                        <input type="text" name="category-name" id="category-name" />
                        <button type="submit" className="submitBTN">Add Category</button>
                    </form>
                </div>
            </section>
        </menuContext.Provider>
    )
}

export default Menu;
export { menuContext };