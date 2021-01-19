import React from 'react'
import logo from '../../assets/images/logo.png'
import style from './Logo.module.scss'

function Logo() {
    return (
        <img className={style.Logo} src={logo}></img>
    )
}

export default Logo
