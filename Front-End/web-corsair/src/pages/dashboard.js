import React from 'react'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import style from './dashboard.module.scss'
import logo from '../assets/images/logo.png'
import { useHistory } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout

function Dashboard(props) {
    const history = useHistory()

    const signOut = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('password')

        history.push('/')
    }

    const logIn = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        history.push('/auth/login')
    }

    return (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.87) 1.01%, #292929 108.84%)'
                }}

            >
                <div className={style.Logo} onClick={() => history.push('/dashboard')}>
                    <img className={style.LogoImg} src={logo}></img>
                </div>
                <h1 className={style.Greeting}>
                    Hello, {localStorage.getItem('username')}
                </h1>
                <div className={style.Menu}>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />} onClick={logIn}>
                            Log In
                    </Menu.Item>
                        <Menu.Item key="2" icon={<LogoutOutlined />} onClick={signOut}>
                            Sign Out
                    </Menu.Item>
                    </Menu>
                </div>

            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', height: '89vh' }}>
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center'}}> Application created by Radoslaw Karbowiak <br /> Ant Design ©2018 Created by Ant UED </Footer>
            </Layout>
        </Layout>
    )
}

export default Dashboard
