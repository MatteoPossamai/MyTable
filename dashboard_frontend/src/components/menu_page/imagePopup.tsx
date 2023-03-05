function ImagePopup(props : {active: boolean, changeVisibility: any}){
    let {active, changeVisibility} = props;
    return (
        <div className="popup imagePopup" style={{display: active ? "flex" : "none"}}>
            <h1>Popup</h1>

            <div className="imageContainer">
                
            </div>

            <button type="button" className="submitBTN" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                changeVisibility(false);
            }}>Close</button>
        </div>
    )
}

export default ImagePopup;