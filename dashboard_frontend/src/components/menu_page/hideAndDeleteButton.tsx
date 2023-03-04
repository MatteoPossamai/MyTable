import { BiHide } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

const HideAndDeleteButton = (props: { hideCategory: any, deleteCategory: any, hided: boolean, type:string }) => {
    return (
        <div className="hideAndDelete">
            {/* Button to hide a particular Item or category */}
            <button onClick={(e) => props.hideCategory(e) } type="button"> 
                    <BiHide className="hideIcon" 
                    style={{backgroundColor: props.hided ? "#76CB8E" : "#FF7B7B"}} /> 

                    <p>
                    {props.type === "item" ?
                        props.hided ? "Show Item" : "Nascondi Prodotto"
                        :
                        props.hided ? "Show Category" : "Nascondi Categoria"
                    }
                    </p>
            </button>

            {/* Button to delete a particular Item or category */}
            <button onClick={(e) => props.deleteCategory(e)} type="button"> <BsTrash className="deleteIcon" /> <p>Delete {props.type === "item"? "Prodotto" : "Categoria"} </p></button>
        
        </div>
    );
};

export default HideAndDeleteButton;