import React from 'react'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import style from './Sider.module.scss';
import logo from '../../assets/images/logo.png'
import { useHistory } from 'react-router-dom';
const { Sider } = Layout;


function SiderC() {
    const history = useHistory()
    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.87) 1.01%, #292929 108.84%)'
            }}
            
        >
            <div className={style.Logo} >
                <img className={style.LogoImg} src={logo} onClick={() => history.push('/dashboard')}></img>
            </div>

            <h1 className={style.Greeting}>
                Hello, {localStorage.getItem('username')}
            </h1>


            <div className={style.Menu}>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Log In
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LogoutOutlined />}>
                        Sign Out
                    </Menu.Item>
                </Menu>
            </div>

        </Sider>
    )
}

export default SiderC
