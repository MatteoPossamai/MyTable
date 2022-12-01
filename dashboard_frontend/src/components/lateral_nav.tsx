// Global imports
import { BiHelpCircle, BiCategoryAlt } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiListOrdered } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";

import { IoLogoHackernews } from "react-icons/io";

function LateralNav(){
    return (
        <div className="lateral-nav">
            <ul>
                <li>
                    <a href="#">
                    <IoLogoHackernews className="icons" />
                    </a>
                    <br />
                </li>
                <li>
                    <a href="#">
                        <TfiDashboard className="icons" />
                        <p>Dashboard</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <MdOutlineMenuBook className="icons" />
                        <p>Menu</p>
                        </a>
                </li>
                <li>
                    <a href="#">
                        <BiCategoryAlt className="icons" />
                        <p>Categories</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <IoFastFoodOutline className="icons" />
                        <p>Foods</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <RiListOrdered className="icons" />
                        <p>Orders</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <TbReportAnalytics className="icons" />
                        <p>Reports</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <AiOutlineSetting className="icons" />
                        <p>Settings</p>
                    </a>
                </li>
                <li>
                    
                    <a href="#">
                        <BiHelpCircle className="icons" />
                        <p>Help</p>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default LateralNav;