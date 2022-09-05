import React, {useEffect, useState, useContext} from "react";
import { CredentialsContext } from "../App";
import axios from "axios";

export default function Passwords() {
    const [passwords, setPasswords] = useState([]);
    const [passwordText, setPasswordText] = useState("");
    const [credentials] = useContext(CredentialsContext);

    useEffect(()  => {

    }, [passwords]);

    const persist = (newPasswords) => {
        axios.post('http://localhost:4000/passwords', 
        JSON.stringify({newPasswords}),
        {
            headers: {
                'Content-Type':  'application/json',
                "Authorization": `Basic ${credentials.username}:${credentials.password}`,
            }
        })
        .then((response) => {
            console.log(response);
            }, (error) => {
            console.log(error);
            });
    }

    const addPassword = (e) => {
        e.preventDefault();
        if (!passwordText) return;
        const newPassword = { checked: false, text: passwordText};
        const newPasswords = [...passwords, newPassword];
        setPasswords(newPasswords);
        setPasswordText("");
        persist(newPasswords);
    }

    const togglePassword = (index) => {
        const newPasswordList = [...passwords];
        newPasswordList[index].checked = !newPasswordList[index].checked;
        setPasswords(newPasswordList);
    }

    return (
        <div>
            {passwords.map((password,index) => (
                <div key={index}>
                    <input onChange={() => togglePassword(index)} type="checkbox" />
                    <label>{password.text}</label>
                </div>
            ))}
            <br/>
            <form onSubmit = {addPassword}>
                <input
                    value={passwordText}
                    onChange={(e) => setPasswordText(e.target.value)}
                    type="text">
                </input>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}