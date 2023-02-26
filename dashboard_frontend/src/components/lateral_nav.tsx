// Global imports
import { RxDashboard } from "react-icons/rx";
import { BiFoodMenu } from "react-icons/bi";
import { FiDatabase } from "react-icons/fi";
import { RiSettings5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { useNavigate } from "react-router-dom";
import {RxDoubleArrowLeft} from "react-icons/rx";
import {RxDoubleArrowRight} from "react-icons/rx";

// Local imports
// Context
import { navigationContext } from "./main";
// Components
import Logo from "./logo";

function LateralNav(){
    // Take the base link from the .env file
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    let { setOpenedWidget, isCollapsed, setIsCollapsed } = React.useContext(navigationContext);    

    let history = useNavigate();

    const handleLogout = () => {
        let token:any = localStorage.getItem("token");
        fetch(`${base_link}/restaurant_user/logout/`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            },
            method: "POST",
        }).then((data) => {
            localStorage.clear();
            history(`/login`);
        }
        ).catch((err) => {
            console.log(err);
        }
        )
    }

    let changeCurrentWidget = (widget: number) => {
        setOpenedWidget(widget);
    }

    return (
        <div className="lateral-nav" style={{width: isCollapsed ? "5%" : "17%"}}>
            <Logo collapsed={isCollapsed} />
            <ul>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(0)}>
                        <RxDashboard className={isCollapsed ? "icons_only" : "icons"} />
                        <p style={{display: isCollapsed ? "none" : "block"}}>Dashboard</p>
                    </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(1)}>
                        <BiFoodMenu className={isCollapsed ? "icons_only" : "icons"} />
                        <p style={{display: isCollapsed ? "none" : "block"}}>Menu</p>
                        </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(2)}>
                        <FiDatabase  className={isCollapsed ? "icons_only" : "icons"} />
                        <p style={{display: isCollapsed ? "none" : "block"}}>Ordini</p>
                    </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => changeCurrentWidget(3)}>
                        <RiSettings5Line className={isCollapsed ? "icons_only" : "icons"} />
                        <p style={{display: isCollapsed ? "none" : "block"}}>Impostazioni</p>
                    </section>
                </li>
                <li>
                    <section className="navSection" onClick={() => setIsCollapsed(!isCollapsed)}>
                        { !isCollapsed ? <RxDoubleArrowLeft className={isCollapsed ? "icons_only" : "icons"} />:
                         <RxDoubleArrowRight className={isCollapsed ? "icons_only" : "icons"} />}
                        <p style={{display: isCollapsed ? "none" : "block"}}>Restringi</p>
                    </section>
                </li>
                <li className="navSection logout"> 
                    <section className="navSection" onClick={() => handleLogout()}>
                        <FiLogOut className={isCollapsed ? "icons_only" : "icons"} />
                        <p style={{display: isCollapsed ? "none" : "block"}}>Logout</p>
                    </section>
                </li>
            </ul>
        </div>
    );
}

export default LateralNav;