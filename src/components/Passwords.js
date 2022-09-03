import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
import React, {useState} from "react";

export default function Passwords() {
    const [passwords, setPasswords] = useState([
        {text: "what is up doggo"}
    ]);
    const [passwordText, setPasswordText] = useState("");

    const addPassword = (e) => {
        e.preventDefault();
        if (!passwordText) return;
        setPasswords([...passwords, { text: passwordText}]);
        setPasswordText("");
    }

    return (
        <div>
            {passwords.map((password,index) => (
                <div key={index}>
                    <input type="checkbox" />
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