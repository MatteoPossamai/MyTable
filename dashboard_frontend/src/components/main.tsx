// Global imports
import { useState, createContext, useEffect } from "react";
import axios from 'axios';

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
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    let token:string | null = localStorage.getItem("token");

    

    useEffect(() => {
        const checkIfLogged = async () => {
            let token:any = localStorage.getItem("token");
            console.log(token);
    
            try {
                let res = await fetch(`${base_link}/restaurant_user/logged/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                        "HTTP_TOKEN": token
                    },
                });
                console.log(await res.status);
            }catch (err) {
                console.log(err);
                //window.location.href = "/login";
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