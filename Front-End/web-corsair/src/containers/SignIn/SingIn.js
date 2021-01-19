import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function SingIn() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [logLoading, setLogLoading] = useState(false)

    const loginHandler = (e) => {
        setLogin(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const submitSignIn = () => {
        setLogLoading(true)

        if (login != '' && password != '' && validateEmail(email)) {
            axios.post('http://127.0.0.1:5000/users', {
                "username": login,
                "password": password,
                "email": email
            }).then(res => {
                console.log(
                    res
                )
                if(res.status == 201) {
                    alert("Your account was added! Please log in!")
                }
                else {
                    alert("Something is wrong!")
                }
                setLogLoading(false)
            }).catch(e => {
                console.log(e)
                setLogLoading(false)
            })
        }
        else {
            alert("Something is wrong! Check your credentials!")
            setLogLoading(false)
        }
    }


    return (
        <>
            <h1>Sign In</h1>
            <Space direction="vertical">
                <Input size="large" placeholder="username" prefix={<UserOutlined />} onChange={loginHandler} />
                <Input.Password
                    placeholder="input password"
                    size="large"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={passwordHandler}
                />
                <Input placeholder="e-mail" size="large" onChange={emailHandler} />
                <Button type="primary" size='large' onClick={submitSignIn} loading={logLoading}>Sign In</Button>
            </Space>
        </>
    )
}

export default SingIn