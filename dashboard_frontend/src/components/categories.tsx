function Categories(){
    return (
        <section className="categories">
            <h1>Categories</h1>
            <div className="categories-content">
                <div className="all-categories">
                    <h2>All Categories</h2>
                    <div className="categories-list">
                        <h1>Categories</h1>
                    </div>
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
    )
}

export default Categories;