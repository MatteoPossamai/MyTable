// Global imports
import { useState, createContext } from "react";

// Local imports
// Components
import Header from "./header";
import LateralNav from "./lateral_nav";

import DashboardCard from "./dashboard";
import Menu from "./menu";
import Categories from "./categories";
import Foods from "./foods";
import Orders from "./orders";
import Reports from "./reports";
import Settings from "./settings";
import Help from "./help";

let navigationContext = createContext<any>(0);

function MainPage(){
    const [openedWidget, setOpenedWidget] = useState<number>(0);


    return (
        <main>
            <navigationContext.Provider value={{setOpenedWidget}}>
                <Header />
                <LateralNav />
                <div className="main-content">
                    {openedWidget === 0 && <DashboardCard />}
                    {openedWidget === 1 && <Menu />}
                    {openedWidget === 2 && <Categories />}
                    {openedWidget === 3 && <Foods />}
                    {openedWidget === 4 && <Orders />}
                    {openedWidget === 5 && <Reports />}
                    {openedWidget === 6 && <Settings />}
                    {openedWidget === 7 && <Help />}
                </div>
            </navigationContext.Provider>
        </main>
    )
}

export default MainPage;
export { navigationContext };