// Global imports
import { FaUserAlt } from "react-icons/fa";
import {useState} from 'react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    return (
        <header className="header">
            {/* User profile */}
            <aside className="header__user-image-menu">
                <aside>
                    <p>?</p>
                </aside>
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