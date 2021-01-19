import React from 'react'
import style from './Header.module.scss'

function Header(props) {
    return (
        <div className={style.Header}>
            {props.children}
        </div>
    )
}

export default Header