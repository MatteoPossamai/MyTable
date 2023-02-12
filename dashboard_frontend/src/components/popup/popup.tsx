// Global imports
import { useContext } from "react";

// Local imports
// Context
import { menuContext } from "../menu";

function Popup (props:{awake: boolean, title:string, message: string}) {
    const {setPopupAwake, popupFollowingFunction} = useContext(menuContext);

    const handleResponse = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, t:boolean) => {
        e.preventDefault();
        setPopupAwake(false);

        if (t){
            popupFollowingFunction();
        }
    }

    return (
        <div className="popup" style={{display: props.awake ? "block" : "none"}}>
            <h1>{props.title}</h1>
            <br />
            <p>{props.message}</p>
            <br />
            <div>
                <button className="submitBTN" onClick={(e) => handleResponse(e, true)}>Yes</button>
                <button className="submitBTN" onClick={(e) => handleResponse(e, false)}>No</button>
            </div>
        </div>
    )
}

export default Popup;