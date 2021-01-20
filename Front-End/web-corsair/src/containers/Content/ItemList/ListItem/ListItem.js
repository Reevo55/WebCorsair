import React from 'react'
import style from './ListItem.module.scss'
import { Tag } from 'antd';
import { useHistory } from 'react-router-dom';


function ListItem({id, title, category, link, expected_price}) {

    const history = useHistory();

    const itemClick = (e) => {
        e.stopPropagation();
        console.log(e.target.id)

        history.push(`/dashboard/${e.target.id}`)
    }

    return (
        <div className={style.Item} onClick={itemClick} id={id}>
            <a href={link} className={style.Title}>{title}</a>
            
            {category.name != undefined && <Tag className={style.Tag}>{category.name}</Tag>}

            <h1 className={style.Price}>Expected price: {expected_price} zł</h1>
        </div>
    )
}

export default ListItem
