// Global imports
import { RxDashboard } from "react-icons/rx";
import { BiFoodMenu } from "react-icons/bi";
import { FiDatabase } from "react-icons/fi";
import { RiSettings5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Local imports
// Context
import { navigationContext } from "./main";
// Components
import Logo from "./logo";

function LateralNav(){
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    let history = useNavigate();

    const handleLogout = () => {
        
        axios.post(`${base_link}/restaurant_user/logout/`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        }).then((res) => {
            localStorage.clear();
            history(`/login`);
        }
        ).catch((err) => {
            console.log(err);
        }
        )
    }

    let { setOpenedWidget } = React.useContext(navigationContext);

    let changeCurrentWidget = (widget: number) => {
        setOpenedWidget(widget);
    }
    return (
        <div className="lateral-nav">
            <Logo />
            <ul>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(0)}>
                        <RxDashboard className="icons" />
                        <p>Dashboard</p>
                    </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(1)}>
                        <BiFoodMenu className="icons" />
                        <p>Menu</p>
                        </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(2)}>
                        <FiDatabase  className="icons" />
                        <p>Ordini</p>
                    </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(3)}>
                        <RiSettings5Line className="icons" />
                        <p>Settings</p>
                    </section>
                </li>
                <li className="navSection logout"> 
                    <section className="navSection" onClick={() => handleLogout()}>
                        <FiLogOut className="icons" />
                        <p>Logout</p>
                    </section>
                </li>
            </ul>
        </div>
    );
}

export default LateralNav;