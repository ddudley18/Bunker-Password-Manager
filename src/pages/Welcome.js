import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';
import "antd/dist/antd.css";

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Link to="/register" >Register</Link>
      </div>
    )
  }
}