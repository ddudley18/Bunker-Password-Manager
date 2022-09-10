import {React, useContext} from 'react';
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import { CredentialsContext } from '../App';
import Passwords from "../components/Passwords"

export default function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

    return (
      <div>
        {credentials && <button onClick={logout}>Logout</button>}
        <h1>Welcome {credentials && credentials.username}!</h1>
        {!credentials && <Link to="/register" >Register</Link>}
        <br />
        {!credentials && <Link to="/login" >Login</Link>}
        {credentials && <Passwords />}
      </div>
    );
}