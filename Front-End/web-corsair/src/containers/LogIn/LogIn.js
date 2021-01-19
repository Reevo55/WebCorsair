import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Input, Space, Button,  Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios'
import { useHistory } from 'react-router-dom';


function LogIn() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [logLoading, setLogLoading] = useState(false)

    const history = useHistory();

    const logIn = () => {
        console.log('Logged in')
        setLogLoading(true)

        axios.get('http://127.0.0.1:5000/auth', {
            auth: {
                username: login,
                password: password
            }
        }).then(res => {
            if (res.status == 200) {
                alert("Logged In")
                
                localStorage.setItem('username', login)
                localStorage.setItem('password', password)

                history.push('/dashboard')
            } else {
                alert("Error, try again!")
            }
            setLogLoading(false);

        }).catch(e => {
            setLogLoading(false)
            alert("Error, try again!")
        })
    }

    const loginHandler = (e) => {
        setLogin(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <h1>Log in</h1>
            <Space direction="vertical">
                <Input size="large" placeholder="username" prefix={<UserOutlined />} onChange={loginHandler} />
                <Input.Password
                    placeholder="input password"
                    size="large"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={passwordHandler}
                />
                <Button type="primary" size='large' onClick={logIn} loading={logLoading}>Log In</Button>
                <p>You are not a<Button type="link" href='/auth/signin'>member</Button>yet?</p>
            </Space>
        </>
    )
}

export default LogIn