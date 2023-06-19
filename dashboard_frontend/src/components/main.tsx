// Global imports
import { useState, createContext, useEffect } from "react";

// Local imports
// Components
import Header from "./header";
import LateralNav from "./lateral_nav";
import DashboardCard from "./dashboard";
import Menu from "./menu";
import Orders from "./orders";
import Settings from "./settings";

let navigationContext = createContext<any>(0);

const updateColors = (colors: String[]) => {
    console.log(colors);
    document.documentElement.style.setProperty('--primary-color', String(colors[0]));
    document.documentElement.style.setProperty('--secondary-color', String(colors[1]));
    document.documentElement.style.setProperty('--box-color', String(colors[2]));
    document.documentElement.style.setProperty('--bg-color', String(colors[3]));
    document.documentElement.style.setProperty('--text-color', String(colors[4]));
}

const updateBorder = (border: Number) => {
    document.documentElement.style.setProperty('--border-radius-fix', String(border) + "px");
}

function MainPage(){
    const [openedWidget, setOpenedWidget] = useState<number>(0);
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    let token:string | null = localStorage.getItem("token");
    let [isCollapsed, setIsCollapsed] = useState(false);
    const [colors, setColors] = useState<String[]>([]);
    const [border, setBorder] = useState<Number>(10);

    useEffect(() => {
        const checkIfLogged = async () => {
            let token:any = localStorage.getItem("token");
    
            try {
                let res = await fetch(`${base_link}/restaurant_user/logged/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                        "HTTP_TOKEN": token
                    },
                });
                let status = await res.status;
                if (status !== 204){
                    window.location.href = "/login";
                }
            }catch (err) {
                window.location.href = "/login";
            }
        }

        if (token === null){
            window.location.href = "/login";
        }else{
            checkIfLogged();
        }
    }, [token, base_link])

    return (
        <main>
            <navigationContext.Provider value={{setOpenedWidget, isCollapsed, setIsCollapsed
            , colors, setColors, border, setBorder}}>
                <Header />
                <LateralNav />
                <div className="main-content" style={{width: isCollapsed ? "95%" : "83%"}}>
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
export { navigationContext, updateColors, updateBorder };