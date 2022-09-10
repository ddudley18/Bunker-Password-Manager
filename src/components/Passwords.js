import React, {useEffect, useState, useContext} from "react";
import { CredentialsContext } from "../App";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Passwords() {
    const [passwords, setPasswords] = useState([]);
    const [passwordText, setPasswordText] = useState("");
    const [isPasswords, setIsPasswords] = useState(false);
    const [credentials] = useContext(CredentialsContext);

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

    useEffect(() => {
        axios.get('http://localhost:4000/passwords',
        {
            headers: {
                'Content-Type':  'application/json',
                "Authorization": `Basic ${credentials.username}:${credentials.password}`,
            }
        })
            .then((passwords) => {
                if (passwords.data != "EMPTY") {
                    setPasswords(passwords.data);
                    setIsPasswords(true);
                } else {
                    setIsPasswords(false);
                }
            });
    }, []);

    const addPassword = (e) => {
        e.preventDefault();
        if (!passwordText) return;
        const newPassword = { checked: false, text: passwordText};
        const newPasswords = [...passwords, newPassword];
        setPasswords(newPasswords);
        setPasswordText("");
        persist(newPasswords);
    }

    const togglePassword = (id) => {
        const newPasswordList = [...passwords];
        const passwordItem = newPasswordList.find((password) => password.id === id);
        passwordItem.checked = !passwordItem.checked;
        setPasswords(newPasswordList);
        persist(newPasswordList);
    }

    const getPasswords = () => {
        return passwords;
    };

    return (
        <div>
            {passwords && getPasswords().map((password) => (
                <div key={password.id}>
                    <input
                        checked={password.checked}
                        onChange={() => togglePassword(password.id)} 
                        type="checkbox" />
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