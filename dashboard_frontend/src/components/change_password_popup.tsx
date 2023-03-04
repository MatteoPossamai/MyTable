function ChangePasswordPopup (props: {old: string, setOld: (old: string) => void, pass: string, setPass: (pass: string) => void, conf: string,
     setConf: (conf: string) => void, spp: any, spv: any, visible: boolean, setVisible: (visible: boolean) => void}) {
    
    const changePassword = (e:any) => {
        e.preventDefault();
        const base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
        let token: any = localStorage.getItem("token");

        if (props.old === "" || props.pass === "" || props.conf === "") {
            props.spv(true);
            props.spp("Tutti i campi sono richiesti");
            props.setVisible(false);
            props.setOld("");
            props.setPass("");
            props.setConf("");
            return;
        }
        if (props.pass !== props.conf) {
            props.spv(true);
            props.spp("Le password non corrispondono");
            props.setVisible(false);
            props.setOld("");
            props.setPass("");
            props.setConf("");
            return;
        }

        if (props.pass.length < 8) {
            props.spv(true);
            props.spp("La password deve essere almeno di 8 caratteri, con almeno un numero e una lettera");
            props.setVisible(false);
            props.setOld("");
            props.setPass("");
            props.setConf("");
            return;
        }

        let data = {
            "old_password" : props.old,
            "password" : props.pass
        }

        fetch(`${base_link}/restaurant_user/change-password/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            }, 
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.status === 204) {
                props.spv(true);
                props.spp("Password cambiata con successo");
                props.setVisible(false);
                props.setOld("");
                props.setPass("");
                props.setConf("");
            }else{
                return res.json();
            }
        }
        ).then((data) => {
            if (data) {
                props.spv(true);
                props.spp(data.message);
                props.setVisible(false);
                props.setOld("");
                props.setPass("");
                props.setConf("");
            }            
        }).catch((err) => {
            console.log(err);
            props.spv(true);
            props.spp("Qualcosa e' andato storto...");
            props.setVisible(false);
            props.setOld("");
            props.setPass("");
            props.setConf("");
        })
    }
    
    return (
        <div className="change-password-popup" style={{display: props.visible ? "flex" : "none",
         left: props.visible ? "" : "0" }}>
            <h2>Cambia Password</h2>
            <p>Password deve essere lunga almeno 8 caratteri, e deve contenere almeno un numero e una lettera</p>
            <form className="generalForm">
                <label htmlFor="old-password">Vecchia Password</label>
                <input type="password" name="old-password" id="old-password" value={props.old} onChange={(e) => props.setOld(e.target.value)} />
                <label htmlFor="new-password">Nuova Password</label>
                <input type="password" name="new-password" id="new-password" value={props.pass} onChange={(e) => props.setPass(e.target.value)} />
                <label htmlFor="confirm-password">Conferma Password</label>
                <input type="password" name="confirm-password" id="confirm-password" value={props.conf} onChange={(e) => props.setConf(e.target.value)} />
                <button type="submit" onClick={e => changePassword(e)}>Change Password</button>
            </form>

        </div>
    )
}

export default ChangePasswordPopup;