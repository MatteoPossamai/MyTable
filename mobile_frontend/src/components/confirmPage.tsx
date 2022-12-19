// Global Imports
import { useParams,useNavigate } from "react-router-dom";

const ConfirmPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();

    const handleBackToMenu = () => {
        navigate(`/mytable/menu/${id}`);
    };
    return (
        <div className="confirmPage">
            <h2>Ordine confermato</h2>
            <h3>Il tuo ordine Arrivera'<br /> tra poco</h3>
            <button className="longButton" onClick={() => handleBackToMenu()}>&#x2190; Back to Menu</button>
        </div>
    );
};

export default ConfirmPage;