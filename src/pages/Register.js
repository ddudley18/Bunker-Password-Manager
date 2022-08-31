import {React, Component, useState} from "react";
import "antd/dist/antd.css";
import { Layout, Button, Checkbox, Form, Input } from 'antd';
import "../App.css";
import axios from "axios";
const { Header, Footer, Sider, Content } = Layout;

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        axios.post('http://localhost:4000/register', JSON.stringify({
            username: username,
            password: password,
        }),
        {
            headers: {
                'Content-Type':  'application/json'
            }
        })
        .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    };
    return (
        <div>
            <h1>Register</h1>
            <Form 
            // style={{display:"flex", flexwrap:"wrap", width:600+"px", height:600+"px", justifyContent:"center"}}
            style={{margin:"auto", width:"400px"}}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            >
            <Form.Item
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
        
            <Form.Item
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
        
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
        
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={register} type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>
        </div>
    );
}