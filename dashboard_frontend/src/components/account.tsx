// Global imports
import { useState, useEffect } from "react";

// Local imports
// Styles
import "../styles/settings.css";

function Account(){
    const base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
    let token: any = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [update, setUpdate] = useState(false);

    const [email, setEmail] = useState("");

    useEffect(() => {
        // Load the restaurant informations
        let id = window.location.pathname.split("/")[2];

        fetch(`${base_link}/restaurant/${id}/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            return res.json();
        }
        ).then((data) => {
            let informations = data.restaurant;
            setName(informations.name);
            setAddress(informations.location);
            setPhone(informations.phone);
            setDescription(informations.description);
            setEmail(informations.owner);
        }).catch((err) => {
            console.log(err);
        })
    }, [base_link])
    
    const handleSave = (e:any) => {
        e.preventDefault();
        let id = window.location.pathname.split("/")[2];

        let data = {
            "name": name,
            "location": address,
            "phone": phone,
            "description": description
        }

        fetch(`${base_link}/restaurant/put/${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                "HTTP_TOKEN": token
            }, 
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }
        ).then((data) => {
            console.log(data);
            setUpdate(!update);
        }).catch((err) => {
            console.log(err);
        })
    }

    const changePassword = (e:any) => {
        e.preventDefault();
    }

    return (
        <div className="accountMain">
            <h1>Account</h1>
            <p>In this page you can handle your personal informations and your restaurant as well</p>

            <section className="informationSection">
                <aside>
                    <h2>Account Informations</h2>
                    <p>Your email is: <a href={`mailto:${email}`}>{email}</a></p>
                    <button onClick={(e) => changePassword(e)} className="submitBTN">Change password</button>
                </aside>

                <main>
                    <h2>Restaurant informations</h2>
                    <form className="generalForm" onSubmit={(e) => handleSave(e)}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <button type="submit">Save</button>
                    </form> 
                </main>
            </section>
        </div>
    )
}

export default Account;