// Global imports
import { RxDashboard } from "react-icons/rx";
import { BiFoodMenu } from "react-icons/bi";
import { FiDatabase } from "react-icons/fi";
import { RiSettings5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import React from "react";

// Local imports
// Context
import { navigationContext } from "./main";
// Components
import Logo from "./logo";

function LateralNav(){
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
                    <section className="navSection" onClick={() => changeCurrentWidget(0)}>
                        <FiLogOut className="icons" />
                        <p>Logout</p>
                    </section>
                </li>
            </ul>
        </div>
    );
}

export default LateralNav;