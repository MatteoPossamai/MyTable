import {QRCodeSVG} from 'qrcode.react';
import "../styles/dashboard.css";
import { useContext } from 'react';
import { navigationContext, updateColors, updateBorder } from './main';

function DashboardCard(){
    const base_redirect:string | undefined = process.env.REACT_APP_BASE_REDIRECT;
    const id = window.location.pathname.split("/")[2];
    let link_qr = `${base_redirect}/${id}`;

    const {colors, setColors, border, setBorder} = useContext(navigationContext);

    const takeAndDownload = (e: any, filename: string, text: string) => {
        // Get the SVG element
        const svg = document.getElementById("qrCode") as HTMLElement;

        // Get the SVG data
        const svgData = new XMLSerializer().serializeToString(svg);

        // Create a canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Create an image element
        const img = document.createElement("img");

        // Set the image source to the SVG data
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));

        // When the image loads, draw the image on the canvas
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);

            // get the logo of the page from the public folder
            const logo = new Image();
            logo.src = "../../mytable_logo.png";
            ctx?.drawImage(logo, 97, 97, 60, 60);

            // Convert the canvas to a data URL in PNG format
            const pngData = canvas.toDataURL("image/png");

            // Create a link element
            const link = document.createElement("a");

            // Set the download attribute of the link to the filename
            link.setAttribute("download", filename);

            // Set the href of the link to the PNG data
            link.setAttribute("href", pngData);
            document.body.appendChild(link);

            // Simulate click
            link.click();
            document.body.removeChild(link);
        }
        img.onerror = function() {
            throw new Error("Error loading image");
        }
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
        e.preventDefault();

        // download the file
        const link = document.createElement("a");
        link.download = "sample";
        link.click();
    }

    const getColors = (e: any) => {
        e.preventDefault();
        const primaryColor = document.getElementById("primaryColor") as HTMLInputElement;
        const secondaryColor = document.getElementById("secondaryColor") as HTMLInputElement;
        const bgColor = document.getElementById("bgColor") as HTMLInputElement;
        const boxColor = document.getElementById("boxColor") as HTMLInputElement;
        const textColor = document.getElementById("textColor") as HTMLInputElement;


        setColors([primaryColor.value, secondaryColor.value, bgColor.value, boxColor.value, textColor.value]);
        updateColors([primaryColor.value, secondaryColor.value, bgColor.value, boxColor.value, textColor.value]);
    }

    const setColorsOnRemote = (e: any) => {
        e.preventDefault();
        const primaryColor = document.getElementById("primaryColor") as HTMLInputElement;
        const secondaryColor = document.getElementById("secondaryColor") as HTMLInputElement;
        const bgColor = document.getElementById("bgColor") as HTMLInputElement;
        const boxColor = document.getElementById("boxColor") as HTMLInputElement;
        const textColor = document.getElementById("textColor") as HTMLInputElement;

        // take the borders from the form
        const border = document.getElementById("radius") as HTMLInputElement;
        setBorder(border.value);

        setColors([primaryColor.value, secondaryColor.value, bgColor.value, boxColor.value, textColor.value]);
        updateColors([primaryColor.value, secondaryColor.value, bgColor.value, boxColor.value, textColor.value]);

        const data = {"colors":[
            primaryColor.value, secondaryColor.value, bgColor.value, boxColor.value, textColor.value
        ], "border": border.value};

        let token: any = localStorage.getItem("token");

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
        <>       
            <h1 className="topHeading">Dashboard</h1>
            <div className="dashboardWrapper">
                <section className='news'>
                    <h2>News</h2>
                    <aside> 
                        <h3>Versione di MyTable</h3>
                        <p>
                            Ora siamo alla prima versione del nostro prodotto, in cui puoi creare un locale
                            e gestire i tuoi menu. In futuro, ci saranno un numero molto alto di funzionalita'  
                            che ti permetteranno di gestire al meglio il tuo locale, risparmiare tempo ed 
                            essere piu' eco-friendly. 

                            <br/><br/>

                            Per permettere ai tuoi clienti di vedere i menu, ti diamo questo QR code alla tua destra,
                            che ti bastera' stampare e mettere sul tavolo. Poi, chiunque sara' in grado di scansionarlo 
                            e visualizzare tutto cio' che di piu' buono hai da offrire.
                        </p>
                    </aside>
                    <aside>
                        <h3>Benvenuto in MyTable</h3>
                        <p>Benvenuto in MyTable, l'applicazione che ti permette di rendere piu' SMART
                            il tuo ristorante o bar. Creando un unico account potrai gestire piu' locali
                            e avere un unico punto di riferimento per tutte le tue attivita'.

                            <br/><br/>
                            Un unico punto per gestire menu, ordinazioni e prodotti. 
                        </p>
                    </aside>
                </section>

                <aside className='qrAndColor'>
                    <section className="qrSection">
                    <h2>QR Code</h2>
                        <QRCodeSVG
                            id='qrCode' 
                            value={link_qr}
                            size={256}
                            level='H'
                            includeMargin={true}
                            bgColor="#E5E5E5"
                            imageSettings={
                                {
                                    src: "../../mytable_logo.png",
                                    height: 60,
                                    width: 60,
                                    excavate: true
                                }
                            }
                            />
                        <button className='submitBTN' onClick={(e) => takeAndDownload(e, "sample", "Sample")}>Download</button>
                    </section>

                    <section className="qrSection">
                        <h2>Personalizzazioni</h2>
                        <form className='generalForm'>
                            <section style={{display: 'grid', gridTemplateColumns: "repeat(4, 1fr)"}}>
                                <label htmlFor='primaryColor'>Colore primario</label>
                                <input type='color' name='primaryColor' id='primaryColor' placeholder='Colore primario' 
                                onChange={(e) => getColors(e)} value={colors[0]} />
                                <label htmlFor='secondaryColor'>Colore secondario</label>
                                <input type='color' name='secondaryColor' id='secondaryColor' placeholder='Colore secondario' 
                                onChange={(e) => getColors(e)} value={colors[1]} />
                                <label htmlFor='bgColor'>Colore sfondo</label>
                                <input type='color' name='bgColor' id='bgColor' placeholder='Colore sfondo' 
                                onChange={(e) => getColors(e)} value={colors[2]} />
                                <label htmlFor='boxColor'>Colore contenitori</label>
                                <input type='color' name='boxColor' id='boxColor' placeholder='Colore contenitori' 
                                onChange={(e) => getColors(e)} value={colors[3]} />
                                <label htmlFor='textColor'>Colore testo</label>
                                <input type='color' name='textColor' id='textColor' placeholder='Colore testo' 
                                onChange={(e) => getColors(e)} value={colors[4]} />
                                <label htmlFor='radius'>Bordi</label>
                                <input type='number' name='radius' id='radius' placeholder='Bordi' 
                                onChange={(e) => updateBorder(Number(e.target.value), setBorder)} value={border} />
                            </section>
                            <input type='submit' onClick={(e) => setColorsOnRemote(e)} value='Salva' className='submitBTN' />
                        </form>
                    </section>
                </aside>
            </div>
        </>
    )
}

export default DashboardCard;