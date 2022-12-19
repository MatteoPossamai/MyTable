// Global imports
import {memo} from "react";
import {useNavigate, useParams} from 'react-router-dom';

const AssurancePopUp = memo((props: {visible:boolean, toggle: any}) => {
    // State and history
    let {visible, toggle} = props;
    let history = useNavigate();
    const { id } = useParams<{id: string}>();

    const handlePopup = (e: React.MouseEvent<HTMLButtonElement>, action: string) => {
        e.preventDefault();
        if (action === "c") {
            // Sent to payment page
            history(`/mytable/menu/payment/${id}`);
        }
        toggle(false);
    };

    return (
        <>
            <div style={{display: visible ? "block" : "none"}} className="assurance">
                <h2 className="assurancePopUp__title">Conferma</h2>
                <p className="assurancePopUp__text">
                    Vuoi confermare l'ordine?
                </p>
                <aside>
                    <button className="longButton" onClick={(e) => handlePopup(e, "c")}>Conferma</button>
                    <button className="longButton" onClick={(e) => handlePopup(e, "x")}>X</button>
                </aside>
            </div>
        </>
    );
});

export default AssurancePopUp;