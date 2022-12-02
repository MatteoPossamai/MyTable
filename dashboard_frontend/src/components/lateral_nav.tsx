// Global imports
import { BiHelpCircle, BiCategoryAlt } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiListOrdered } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";

import { IoLogoHackernews } from "react-icons/io";

// Local imports
// Context
import { navigationContext } from "./main";
import React from "react";

function LateralNav(){
    let { setOpenedWidget } = React.useContext(navigationContext);
    let size:string = '3.5rem';

    let changeCurrentWidget = (widget: number) => {
        setOpenedWidget(widget);
        console.log(widget);
    }
    return (
        <div className="lateral-nav">
            <ul>
                <li>
                    <section>
                    <IoLogoHackernews size={size} className="icons" />
                    </section>
                    <br />
                </li>
                <li>
                    <section  onClick={() => changeCurrentWidget(0)}>
                        <TfiDashboard size={size} className="icons" />
                        <p>Dashboard</p>
                    </section>
                </li>
                <li>
                    <section onClick={() => changeCurrentWidget(1)}>
                        <MdOutlineMenuBook size={size} className="icons" />
                        <p>Menu</p>
                        </section>
                </li>
                <li>
                    <section onClick={() => changeCurrentWidget(2)}>
                        <BiCategoryAlt size={size} className="icons" />
                        <p>Categories</p>
                    </section>
                </li>
                <li>
                    <section onClick={() => changeCurrentWidget(3)}>
                        <IoFastFoodOutline size={size} className="icons" />
                        <p>Foods</p>
                    </section>
                </li>
                <li>
                    <section onClick={() => changeCurrentWidget(4)}>
                        <RiListOrdered size={size} className="icons" />
                        <p>Orders</p>
                    </section>
                </li>
                <li>
                    <section onClick={() => changeCurrentWidget(5)}>
                        <TbReportAnalytics size={size} className="icons" />
                        <p>Reports</p>
                    </section>
                </li>
                <li>
                    <section onClick={() => changeCurrentWidget(6)}>
                        <AiOutlineSetting size={size} className="icons" />
                        <p>Settings</p>
                    </section>
                </li>
                <li> 
                    <section onClick={() => changeCurrentWidget(7)}>
                        <BiHelpCircle size={size} className="icons" />
                        <p>Help</p>
                    </section>
                </li>
            </ul>
        </div>
    );
}

export default LateralNav;