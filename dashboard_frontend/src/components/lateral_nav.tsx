// Global imports
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlineMenuBook } from "react-icons/md";
import { RiListOrdered } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import React from "react";

// Local imports
// Context
import { navigationContext } from "./main";
// Components
import Logo from "./logo";

function LateralNav(){
    let { setOpenedWidget } = React.useContext(navigationContext);
    let size:string = '3.5rem';

    let changeCurrentWidget = (widget: number) => {
        setOpenedWidget(widget);
    }
    return (
        <div className="lateral-nav">
            <Logo />
            <ul>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(0)}>
                        <TfiDashboard size={size} className="icons" />
                        <p>Dashboard</p>
                    </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(1)}>
                        <MdOutlineMenuBook size={size} className="icons" />
                        <p>Menu</p>
                        </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(2)}>
                        <RiListOrdered size={size} className="icons" />
                        <p>Ordini</p>
                    </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(3)}>
                        <AiOutlineSetting size={size} className="icons" />
                        <p>Settings</p>
                    </section>
                </li>
                <li className="navSection logout"> 
                    <section className="navSection" onClick={() => changeCurrentWidget(0)}>
                        <FiLogOut size={size} className="icons" />
                        <p>Logout</p>
                    </section>
                </li>
            </ul>
        </div>
    );
}

export default LateralNav;