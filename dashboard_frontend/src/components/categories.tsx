// Global Imports
import { useState, createContext } from "react";

// Local imports
import data from "../fake_categories.json";
// Components
import SingleCategory from "./category";

let categoriesContext = createContext<any>(0);

function Categories(){
    // fetching data from the fake server
    const categories = data.categories;
    categories.sort((a, b) => a.number-b.number);

    // state for the selected category
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? categories[0].id : null);

    return (
        <categoriesContext.Provider value={{selectedCategory, setSelectedCategory}}>
            <section className="categories">
                <div className="categories-content">
                    <h1>All your Categories</h1>
                    <div className="all-categories">
                        <div className="categories-list">
                            {categories.map((category) => (
                                <SingleCategory key={category.id} category={category} />
                            ))}
                        </div>
                    </div>
                </div>

                <hr />

                <div className="categories-foods">
                    <h1>Category's foods</h1>
                    <div className="all-categories">
                    
                    </div>
                </div>
                        

                <hr />

                <div className="add-category">
                    <h2>Add Category</h2>
                    <form className="addCategoryForm">
                        <label htmlFor="category-name">Category Name</label>
                        <input type="text" name="category-name" id="category-name" />
                        <label htmlFor="category-image">Category Image</label>
                        <input type="file" name="category-image" id="category-image" />
                        <button type="submit">Add Category</button>
                    </form>
                </div>
            </section>
        </categoriesContext.Provider>
    )
}

export default Categories;
export { categoriesContext };