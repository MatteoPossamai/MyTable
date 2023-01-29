// Global imports
import { useState, createContext } from "react";

// Local imports
// Components
import Header from "./header";
import LateralNav from "./lateral_nav";
import DashboardCard from "./dashboard";
import Menu from "./menu";
import Orders from "./orders";
import Settings from "./settings";

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
                    {openedWidget === 2 && <Orders />}
                    {openedWidget === 3 && <Settings />}
                </div>
            </navigationContext.Provider>
        </main>
    )
}

export default MainPage;
export { navigationContext };