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
    document.documentElement.style.setProperty('--primary-color', String(colors[0]));
    document.documentElement.style.setProperty('--secondary-color', String(colors[1]));
    document.documentElement.style.setProperty('--box-color', String(colors[2]));
    document.documentElement.style.setProperty('--bg-color', String(colors[3]));
    document.documentElement.style.setProperty('--text-color', String(colors[4]));
}

const updateBorder = (border: Number, setBorder: any) => {
    setBorder(border);
    document.documentElement.style.setProperty('--border-radius-fix', String(border) + "px");
}

function MainPage(){
    const [openedWidget, setOpenedWidget] = useState<number>(0);
    let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

    let token:string | null = localStorage.getItem("token");
    let [isCollapsed, setIsCollapsed] = useState(false);
    const [colors, setColors] = useState<String[]>(["#000000", "#000000", "#000000", "#000000", "#000000"]);
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
    }, [token, base_link]);

    useEffect(() => {
        let currentUrl = window.location.href;
        let id = currentUrl.split("/")[4];
        fetch(`${base_link}/restaurant/${id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            if (res.status === 403 || res.status === 400){
                window.location.href = "/error";
            }
            return res.json();
        }).then((data) => {
            let palette = data.palette;
            if (palette === undefined){
                palette = {
                    primary: "#530F26",
                    secondary: "#FFB01D",
                    bg: "#ffffff",
                    box: "#E5E5E5",
                    text: "#707070"
                }
                let border = 10;
                setColors([
                    palette.primary,
                    palette.secondary,
                    palette.bg,
                    palette.box,
                    palette.text
                ])
                updateColors([
                    palette.primary,
                    palette.secondary,
                    palette.bg,
                    palette.box,
                    palette.text
                ]);
                updateBorder(border, setBorder);
                setColorFirstTime(palette, border)
            } 
            let colors = [
                palette.primary,
                palette.secondary,
                palette.bg,
                palette.box,
                palette.text
            ]

            let border = data.border;
            setColors(colors)
            updateColors(colors);
            updateBorder(border, setBorder);
        }).catch((err) => {
            console.log(err);
        })
    }, [base_link])

    const setColorFirstTime = (palette: String[], border: number) => {

        const data = {"colors":palette, "border": border};

        let token: any = localStorage.getItem("token");
        const id = window.location.pathname.split("/")[2];

        fetch(`${process.env.REACT_APP_BASE_LINK}/restaurant/put/color/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            },
            body: JSON.stringify({data}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

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