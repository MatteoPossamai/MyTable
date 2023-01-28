import {QRCodeSVG} from 'qrcode.react';
import "../styles/dashboard.css";

function DashboardCard(){
    return (
        <>
            { /* Statistiche */}
            
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
                <section className="qrSection">
                    <h2>QR Code</h2>
                    <QRCodeSVG 
                        value="https://mytable.it" 
                        size={256}
                        level='H'
                        includeMargin={true}
                        bgColor="#f1f1f1"
                        imageSettings={
                            {
                                src: "../../mytable_logo.png",
                                height: 60,
                                width: 60,
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