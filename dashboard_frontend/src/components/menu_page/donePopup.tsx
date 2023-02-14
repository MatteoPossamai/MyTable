// Global import
import { MdOutlineDoneOutline } from "react-icons/md";

function DonePopup(props:{text:string, visible:boolean, page:string}){
    return (
        <div className={`donePopup ${props.visible ? '' : 'alert-hidden'} 
            ${props.page==="login" ? "doneLogin" : ""}`}>
            <MdOutlineDoneOutline className="doneicon" />
            <h3>{props.text}</h3>
        </div>
    )
}

export default DonePopup;