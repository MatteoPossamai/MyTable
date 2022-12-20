// Global imports
import { FaUserAlt } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Header() {
    let history = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const sendToHelp = () => {
        history('/help');
    }

    return (
        <header className="header">
            {/* User profile */}
            <aside className="header__user-image-menu">
                <FiHelpCircle className="header__help-icon" onClick={() => sendToHelp()} />
                <div className="header__user-box">                 
                    <FaUserAlt className="header__user-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
            </aside>

            {/** Menu */}
            <nav className="header__menu" style={{display: isMenuOpen ? 'block' : 'none'}}>
                    <button className="header__menu-item">Profile</button>
                    <br />
                    <button className="header__menu-item">Settings</button>
                    <hr className="header__menu-divider" />
                    <button className="header__menu-item">Logout</button>
                </nav>
        </header>
        );
}

export default Header;