function NotePopup(props:{visible:boolean, setVisible:Function, note:string, setNote:Function}) {
    return (
        <div className="note-popup" style={{display: props.visible ? "block": "none"}}>
            <h1>Note per il cameriere</h1>

            <textarea value={props.note} onChange={(e) => props.setNote(e.target.value)}></textarea>

            <button className="longButton" onClick={() => props.setVisible(false)}>Conferma</button>
        </div>
    )
}

export default NotePopup;