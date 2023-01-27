import {QRCodeSVG} from 'qrcode.react';
import "../styles/dashboard.css";

function DashboardCard(){
    return (
        <>
            { /* Statistiche */}
            { /* Prenotazioni (futuro) */}
            { /* Ordini (futuro) */}
            
            <h1 className="topHeading">Dashboard</h1>
            <div className="dashboardWrapper">
                <section className="qrSection">
                    <h2>QR Code</h2>
                    <QRCodeSVG 
                        value="https://reactjs.org/" 
                        size={256}
                        level='H'
                        includeMargin={true}
                        imageSettings={
                            {
                                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
                                height: 50,
                                width: 50,
                                excavate: true
                            }
                        }
                        />
                </section>
            </div>
        </>
    )
}

export default DashboardCard;