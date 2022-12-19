// Global Imports
import { useParams,useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();

    const handlePay = () => {
        navigate(`/mytable/menu/payment/confirm/${id}`);
    };

    return (
        <div>
            <h1>Payment</h1>
            <p>Enter your payment details below.</p>
            <button className="longButton" onClick={() => handlePay()}>Pay</button>
        </div> 
    )
};

export default PaymentPage;