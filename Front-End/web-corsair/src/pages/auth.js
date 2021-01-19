import React from 'react'
import Logo from '../components/Logo/Logo'
import style from './auth.module.scss'
import { Switch, Route } from 'react-router-dom'
import SingIn from '../containers/SignIn/SingIn'
import LogIn from '../containers/LogIn/LogIn'
import { Button } from 'antd';

function Auth() {
    return (
        <section className={style.Auth}>
            <div className={style.Left}>
                <div className={style.LogoContainer}>
                    <Logo />
                </div>
            </div>

            <div className={style.Right}>
                <div className={style.Links}>
                    <Button href="/auth/login">Log In</Button>
                    <Button href="/auth/signin">Sign In</Button>
                </div>

                <div className={style.MainComponent}>
                    <Switch>
                        <Route path="/auth/login">
                            <LogIn />
                        </Route>
                        <Route path="/auth/signin">
                            <SingIn />
                        </Route>
                    </Switch>
                </div>
            </div>
        </section>
    )
}

export default Auth
