// Global Imports
import { useState, useContext } from "react";

// Local imports
// Context
import { menuContext } from "../menu";

function CreateCategory(){
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let token: any = localStorage.getItem("token");

    // Get the update state from the context
    let {update, setUpdate, setDonePopupVisible, setDonePopupText} = useContext(menuContext);
    
    // Data to be sent to the API on creation of the category
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const activeError = () => {
        let flag = true;
        if(categoryName === ""){
            let problem = document.getElementById("categoryProblem1");
            problem!.style.display = "block";
            flag = false;
        }
        if(categoryDescription === ""){
            let problem = document.getElementById("categoryProblem2");
            problem!.style.display = "block";
            flag = false;
        }
        return flag;
    }

    const deactiveError = () => {
        let problem = document.getElementById("categoryProblem1");
        problem!.style.display = "none";

        let problem2 = document.getElementById("categoryProblem2");
        problem2!.style.display = "none";
    }

    const createCategory = (e: any) => {
        e.preventDefault();
        let flag = activeError();
     
        if(flag){
            // Call the API to create the category

            let currentUrl = window.location.href;
            let id = currentUrl.split("/")[4];

            if (id === undefined || isNaN(parseInt(id))) {
                window.location.href = "/login";
            }

            let data = {
                "name": categoryName,
                "description": categoryDescription,
                "restaurant": id,
                "number": 0,
                "isActive": true,
            }

            fetch(`${base_link}/category/create/`, {
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
                // Update the menu
                setUpdate(!update);
                setCategoryName("");
                setCategoryDescription("");
                setDonePopupText("Category created successfully");
                setDonePopupVisible(true);
                return response.json();
              });
        }  
    }

    return (
        <div className="createBox">
            <p>Create Category</p>
            <form className="generalForm" onSubmit={(e) => createCategory(e)}>
                <label htmlFor="categoryName">Category Name</label>
                <p id="categoryProblem1">The name must be given</p>
                <input type="text" value={categoryName} id="categoryName"
                onChange={(e) => {setCategoryName(e.target.value);deactiveError()}} />

                <label htmlFor="categoryDescription">Category Description</label>
                <p id="categoryProblem2">The description must be given</p>
                <input type="text" value={categoryDescription} id="categoryDescription"
                 onChange={(e) => {setCategoryDescription(e.target.value);deactiveError()}} />

                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateCategory;