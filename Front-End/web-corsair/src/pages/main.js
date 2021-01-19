import React from 'react'
import Logo from '../components/Logo/Logo'
import style from './main.module.scss'
import { Button } from 'antd';

function Main() {
    return (
        <section className={style.Background}>
            <div className={style.Container}>
                <Logo />

                <Button type="default" size='large' href="/auth/login">
                    Log In
                </Button>
                <br/>
                <Button type="default" size='large' href="/auth/signin">
                    Sign In
                </Button>
            </div>
        </section>
    )
}

export default Main
