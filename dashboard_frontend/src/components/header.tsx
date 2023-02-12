// Global imports
import { FiHelpCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Header() {
    let history = useNavigate();

    const sendToHelp = () => {
        history('/help');
    }

    return (
        <header className="header">
            {/* User profile */}
            <aside className="header__user-image-menu">
                <FiHelpCircle className="header__help-icon" onClick={() => sendToHelp()} />
            </aside>

        </header>
        );
}

export default Header;