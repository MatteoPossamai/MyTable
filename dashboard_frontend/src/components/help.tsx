function Help(){
    return (
        <div className="soon">
            <h1>Aiuto: Q&A</h1>

            <div>
                
                <h2>Cosa e' MyTable?</h2>
                <p>MyTable e' un'applicazione web che ti permette di gestire la tua attività
                    di ristorazione e non solo. Puoi creare diverse categorie di prodotti,
                    aggiungerli al tuo menu, gestire le tue prenotazioni e molto altro.
                </p>

                <h2>Come posso creare un account?</h2>
                <p>Per creare un account, vai alla pagina di <a href="/signup">registrazione</a> e inserisci i tuoi dati.
                    Una volta completato il processo, riceverai una mail di conferma.
                    A questo punto puoi accedere al tuo account, e iniziare a digitalizzare la tua attività!
                </p>

                <h2>Come posso creare una categoria?</h2>
                <p>Per creare una categoria, vai alla sezione 'Categoirie', vai nella parte sinistra della pagina, 
                    inserisci nell'apposito campo il nome della categoria e clicca su 'Aggiungi'.
                    Complimenti, hai creato la tua prima categoria!
                </p>

                <h2>Come posso creare un prodotto?</h2>
                <p>
                    Per creare un prodotto, vai alla sezione 'Prodotti', vai nella parte sinistra della pagina,
                    seleziona la categoria a cui vuoi aggiungere il prodotto, inserisci i dati richiesti e clicca su 
                    'Aggiungi'. Dopo di che il nuovo prodotto apparira' nella lista dei prodotti.
                    Complimenti, hai creato un nuovo prodotto!
                </p>

                <h2>Come posso cambiare il piano di pagamento che ho sottoscritto?</h2>
                <p>
                    Per cambiare il piano di pagamento, vai alla sezione 'Impostazioni', 
                    vai alla voce 'Piano di pagamento' e clicca su 'Cambia piano'.
                    Dopo di che seleziona il piano che preferisci e clicca su 'Cambia'.
                    Se decidi di attivare un piano inferiore, potrai usufruire dei servizi
                    fino al giorno di scadenza del piano attuale.
                    Se scegli un prodotto piu' caro, Ti verra' addebitata la differenza. 
                </p>
            </div>
        </div>
    )
}

export default Help;